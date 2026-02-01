import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { INQUIRY_OPTIONS, INQUIRY_QUESTIONS } from '../constants';
import { InquiryState } from '../types';
import { X, Copy, Mail, Download, Check, AlertCircle, AlertTriangle } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';

interface InquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const MAX_QUESTIONS = 5;

export const InquiryPanel: React.FC<InquiryPanelProps> = ({ isOpen, onClose, context }) => {
  const [state, setState] = useState<InquiryState>({
    assess: [],
    challenge: [],
    note: ''
  });
  const { copy, copied } = useClipboard();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const copyStatusId = 'inquiry-copy-status';
  const dialogDescId = 'inquiry-dialog-description';

  // Add context to note if provided
  useEffect(() => {
    if (context) {
      const contextLine = `Regarding: ${context}`;
      setState(prev => {
        if (prev.note.includes(contextLine)) return prev;
        return {
          ...prev,
          note: prev.note ? `${contextLine}\n${prev.note}` : `${contextLine}\n`
        };
      });
    }
  }, [context]);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement;
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen]);

  const toggleSelection = (category: 'assess' | 'challenge', item: string) => {
    setState(prev => {
      const list = prev[category];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter(i => i !== item) };
      }
      return { ...prev, [category]: [...list, item] };
    });
  };

  const getQuestions = (): { questions: string[]; truncated: number } => {
    let questions: string[] = [];

    // Rule: pick 2 questions per "Assess" item
    state.assess.forEach(item => {
      const pool = INQUIRY_QUESTIONS[item] || [];
      questions = [...questions, ...pool.slice(0, 2)];
    });

    // Rule: pick 2 questions per "Challenge" item (Prompt said 1-2, prioritizing 2 for coverage)
    state.challenge.forEach(item => {
      const pool = INQUIRY_QUESTIONS[item] || [];
      questions = [...questions, ...pool.slice(0, 2)];
    });

    // Cap at MAX_QUESTIONS total questions to keep it punchy
    const truncated = Math.max(0, questions.length - MAX_QUESTIONS);
    return { questions: questions.slice(0, MAX_QUESTIONS), truncated };
  };

  const generateMessage = () => {
    const { questions } = getQuestions();
    const assessList = state.assess.length > 0 ? state.assess.join(', ') : '(None)';
    const challengeList = state.challenge.length > 0 ? state.challenge.join(', ') : '(None)';
    const contextStr = context || 'FOUNDER DOSSIER';

    return `
INQUIRY — ${assessList} / ${challengeList}

Hi Ebenz — I reviewed your ${contextStr} module.

I want to assess: ${assessList}
I want to challenge: ${challengeList}

Questions:
${questions.length > 0 ? questions.map((q, i) => `${i + 1}. ${q}`).join('\n') : '(Select areas to generate questions)'}

${state.note ? `\nContext/Notes:\n${state.note}` : ''}

If helpful, I'm open to a short call.
— {NAME}
    `.trim();
  };

  const handleCopy = async () => {
    await copy(generateMessage());
  };

  const handleMailto = () => {
    const assessList = state.assess.length > 0 ? state.assess.join(', ') : 'None';
    const challengeList = state.challenge.length > 0 ? state.challenge.join(', ') : 'None';
    const subject = encodeURIComponent(`INQUIRY — ${assessList} / ${challengeList}`);
    const body = encodeURIComponent(generateMessage());
    window.location.href = `mailto:founder@example.com?subject=${subject}&body=${body}`;
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generateMessage()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "founder_inquiry.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Panel Content */}
        <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            aria-describedby={dialogDescId}
            onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-8 border-b border-black/10 flex justify-between items-start bg-strata-cream">
            <div>
              <h2 id="inquiry-title" className="font-sans text-3xl font-bold uppercase tracking-tightest">Inquiry</h2>
              <p id={dialogDescId} className="sr-only">
                Client-side inquiry composer. Press Escape to close this panel.
              </p>
              <div className="font-mono text-xs opacity-muted mt-2 space-y-1">
                <p>NO API. CLIENT-SIDE GENERATION ONLY.</p>
                <p>THIS DOES NOT SEND. IT COMPOSES.</p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close inquiry panel"
              className="p-2 hover:bg-black text-black hover:text-white transition-colors border border-transparent hover:border-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-8 space-y-12 flex-grow overflow-y-auto">
            
            {/* Section 1: Assess */}
            <div>
               <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4 border-b border-black pb-2">
                01. I want to Assess
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {INQUIRY_OPTIONS.assess.map(opt => (
                   <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 border border-black flex items-center justify-center transition-colors ${state.assess.includes(opt) ? 'bg-black text-white' : 'bg-transparent'}`}>
                       {state.assess.includes(opt) && <Check className="w-3 h-3" />}
                     </div>
                     <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={state.assess.includes(opt)}
                       onChange={() => toggleSelection('assess', opt)}
                     />
                     <span className="font-sans text-sm font-medium group-hover:underline">{opt}</span>
                   </label>
                 ))}
               </div>
            </div>

            {/* Section 2: Challenge */}
            <div>
               <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4 border-b border-black pb-2">
                02. I want to Challenge
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {INQUIRY_OPTIONS.challenge.map(opt => (
                   <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 border border-black flex items-center justify-center transition-colors ${state.challenge.includes(opt) ? 'bg-black text-white' : 'bg-transparent'}`}>
                       {state.challenge.includes(opt) && <Check className="w-3 h-3" />}
                     </div>
                     <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={state.challenge.includes(opt)}
                       onChange={() => toggleSelection('challenge', opt)}
                     />
                     <span className="font-sans text-sm font-medium group-hover:underline">{opt}</span>
                   </label>
                 ))}
               </div>
            </div>

             {/* Section 3: Notes */}
             <div>
               <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4 border-b border-black pb-2">
                03. Specific Context
               </h3>
               <textarea 
                 className="w-full h-32 p-4 font-mono text-sm bg-white border border-black/20 focus:border-black focus:outline-none resize-none placeholder-gray-400"
                 placeholder="Enter any specific context here (this appends to the message)..."
                 value={state.note}
                 onChange={(e) => setState({...state, note: e.target.value})}
               />
            </div>

            {/* Preview */}
            {(() => {
              const { questions, truncated } = getQuestions();
              return (
                <div className="bg-black/5 p-4 border border-black/10 font-mono text-xs text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-3 h-3" />
                    <span className="uppercase tracking-wider">Preview Generated Questions</span>
                  </div>
                  {questions.length > 0 ? (
                    <>
                      <ul className="space-y-1 list-disc pl-4">
                        {questions.map((q, i) => <li key={i}>{q}</li>)}
                      </ul>
                      {truncated > 0 && (
                        <div className="flex items-center gap-2 mt-3 text-amber-600">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="uppercase tracking-wider">
                            {truncated} question{truncated > 1 ? 's' : ''} omitted (max {MAX_QUESTIONS})
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="italic">Select items above to populate interview questions.</span>
                  )}
                </div>
              );
            })()}

          </div>

          {/* Footer / Actions */}
          <div className="p-8 border-t border-black/10 bg-gray-50">
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleCopy}
                aria-describedby={copyStatusId}
                className="w-full flex items-center justify-center gap-2 bg-black text-white p-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'COPIED TO CLIPBOARD' : 'COPY MESSAGE'}
              </button>
              <span id={copyStatusId} className="sr-only" role="status" aria-live="polite">
                {copied ? 'Inquiry message copied to clipboard.' : ''}
              </span>
              <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={handleMailto}
                  className="flex items-center justify-center gap-2 border border-black p-3 font-mono text-xs uppercase hover:bg-black/5 transition-colors"
                 >
                   <Mail className="w-3 h-3" /> EMAIL DRAFT
                 </button>
                 <button 
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 border border-black p-3 font-mono text-xs uppercase hover:bg-black/5 transition-colors"
                 >
                   <Download className="w-3 h-3" /> .TXT FILE
                 </button>
              </div>
            </div>
          </div>

        </div>
    </div>,
    document.body
  );
};
