import React, { useRef, useEffect, useState } from 'react';
import { ModuleData, ModuleType } from '../types';
import { COLORS, RECRUIT_CARDS, CONTENT_MODULES } from '../constants';
import { ChevronDown, Plus, ExternalLink, ShieldAlert, Fingerprint, Link as LinkIcon, Check, ArrowRight } from 'lucide-react';
import { Simulator } from './Simulator';

interface ModuleStrataProps {
  module: ModuleData;
  isOpen: boolean;
  onToggle: () => void;
  onInquiryRequest: (context: string) => void;
}

export const ModuleStrata: React.FC<ModuleStrataProps> = ({ module, isOpen, onToggle, onInquiryRequest }) => {
  const themeClass = COLORS[module.themeColor];
  const containerRef = useRef<HTMLElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const panelId = `module-panel-${module.index}`;

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const safeScrollIntoView = (el: HTMLElement | null) => {
    if (!el) return;
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
    el.scrollIntoView({ behavior, block: 'start' });
  };

  const copyText = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      console.warn('Clipboard copy failed:', error);
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (error) {
      console.warn('Clipboard fallback failed:', error);
      return false;
    }
  };

  // Reset details view when module closes
  useEffect(() => {
    if (!isOpen) {
      setIsDetailsOpen(false);
    }
  }, [isOpen]);

  // Snap to view when opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
      setTimeout(() => {
        safeScrollIntoView(containerRef.current);
      }, 100);
    }
  }, [isOpen]);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#module-${module.index}`;
    const success = await copyText(url);
    if (success) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };
  
  const scrollToModule = (index: string) => {
    const el = document.getElementById(`module-${index}`);
    if (el) {
      safeScrollIntoView(el);
      window.location.hash = `module-${index}`;
    }
  };

  const renderManifest = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-8 mb-8">
      {CONTENT_MODULES.filter(m => m.id !== ModuleType.MANIFEST).map((m) => (
         <div 
           key={m.index} 
           onClick={(e) => { e.stopPropagation(); scrollToModule(m.index); }}
           onKeyDown={(e) => {
             if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               e.stopPropagation();
               scrollToModule(m.index);
             }
           }}
           role="button"
           tabIndex={0}
           aria-label={`Jump to ${m.title}`}
           className="group/item flex items-baseline gap-4 cursor-pointer border-b border-current/10 pb-4 hover:pl-4 transition-all duration-300"
         >
           <span className="font-mono text-3xl md:text-4xl font-bold opacity-30 group-hover/item:opacity-100 group-hover/item:text-strata-blue transition-all">
             {m.index}
           </span>
           <span className="font-sans text-xl md:text-2xl font-bold uppercase tracking-tight">
             {m.title}
           </span>
           <ArrowRight className="ml-auto w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
         </div>
      ))}
    </div>
  );

  const renderArtifacts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
      {module.evidence?.map((ev, i) => {
        const isExternal = /^https?:\/\//i.test(ev.link);
        return (
         <a 
           key={i} 
           href={ev.link} 
           {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
           className="group/card block p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
         >
           <div className="flex justify-between items-start mb-4">
             <h4 className="font-sans text-xl font-bold text-white group-hover/card:underline underline-offset-4 decoration-1">
               {ev.title}
             </h4>
             <ExternalLink className="w-5 h-5 text-white/50 group-hover/card:text-white" />
           </div>
           <p className="font-mono text-xs text-white/60 leading-relaxed">
             {ev.description}
           </p>
         </a>
        );
      })}
    </div>
  );

  return (
    <section 
      ref={containerRef}
      id={`module-${module.index}`} 
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-label={`Toggle ${module.title}`}
      className={`relative w-full border-b border-black/10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${themeClass} ${isOpen ? 'py-12 md:py-24' : 'py-8 md:py-12'} cursor-pointer group`}
      onClick={(e) => {
        // Use standard Element casting for robustness with SVGs
        const target = e.target as Element;
        if (target.closest('a') || target.closest('button')) return;
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header Band */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-12 select-none">
          <div className="flex items-baseline gap-6 relative">
             <span className="font-mono text-4xl md:text-6xl font-bold tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
              {module.index}
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tightest leading-none">
              {module.title}
            </h2>
            
            {/* Share Button (Only visible on hover/open) */}
            <button 
              onClick={handleCopyLink}
              aria-label={`Copy link to ${module.title}`}
              className={`absolute -right-12 top-2 p-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity hidden md:block`}
              title="Copy link to module"
            >
              {linkCopied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
            <span>{isOpen ? 'Close' : 'Open'}</span>
            <div className={`transform transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Primary Content (Prompt + Response) - Visible when Open */}
        <div
          id={panelId}
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'max-h-[5000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-8 border-t border-current/20">
            
            {/* Column A: Prompt & Response */}
            <div className="md:col-span-12 lg:col-span-8">
              
              {/* Prompt Block */}
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">
                  Prompt
                </span>
                <div className="font-mono text-xs uppercase tracking-widest opacity-80 border-l-2 border-current/20 pl-4 py-1 leading-relaxed">
                  {module.promptText}
                </div>
              </div>

              {/* Response Block */}
              <div className="mb-8">
                 <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 block mb-2">
                  Response
                </span>
                <div className="font-serif text-xl md:text-3xl leading-relaxed">
                  {module.responseDisplay}
                </div>
              </div>

              {/* Unfold / Drawers Toggle */}
              {module.id !== ModuleType.MANIFEST && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsDetailsOpen(!isDetailsOpen); }}
                   className="group/unfold flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold border-b border-current/30 pb-1 hover:border-current transition-colors mb-8"
                 >
                   <span>{isDetailsOpen ? 'FOLD ↑' : 'UNFOLD ↓'}</span>
                 </button>
              )}
              
              {/* Deep Content / Drawers (Collapsible) */}
              <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isDetailsOpen || module.id === ModuleType.MANIFEST ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                
                {/* Specialized Component Renders */}
                {module.id === ModuleType.MANIFEST && renderManifest()}
                
                {module.id === ModuleType.RECRUITS && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-12">
                    {RECRUIT_CARDS.map((card, idx) => (
                      <div key={idx} className={`p-6 border border-current opacity-90 hover:opacity-100 transition-opacity`}>
                        <div className="font-mono text-xs uppercase tracking-widest mb-2 opacity-70">{card.role}</div>
                        <h4 className="font-serif text-2xl mb-4 italic">{card.name}</h4>
                        <p className="font-sans text-sm font-bold mb-2">{card.capability}</p>
                        <p className="font-sans text-xs opacity-80 leading-relaxed mb-4">{card.desc}</p>
                        <div className="pt-4 border-t border-current/20 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4" />
                          <span className="font-mono text-[10px] uppercase">Prevents: {card.prevents}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {module.id === ModuleType.SIMULATOR && (
                  <div className="mt-4 mb-12" onClick={(e) => e.stopPropagation()}>
                    <Simulator onInquiryRequest={onInquiryRequest} />
                  </div>
                )}

                {module.id === ModuleType.ARTIFACTS && renderArtifacts()}

                {/* Implications Drawer (Generic) */}
                {module.implications && (
                  <div className="mb-12">
                     <h3 className="font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Fingerprint className="w-4 h-4"/> {module.implications.title}
                     </h3>
                     <ul className="space-y-4">
                        {module.implications.content.map((item, i) => (
                          <li key={i} className="flex gap-4 items-start pl-4 border-l-2 border-current/30">
                            <span className="font-mono text-xs pt-1 opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                            <span className="font-sans text-lg">{item}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Column B: Evidence & Actions (Visible when Details Open OR Manifest Hidden) */}
            {module.id !== ModuleType.MANIFEST && (
              <div className={`md:col-span-12 lg:col-span-4 flex flex-col gap-12 transition-all duration-700 delay-100 ${isDetailsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                
                {/* Stress Test */}
                {module.stressTest && (
                   <div className="p-6 border border-current/20 bg-black/5">
                    <h3 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold text-red-500/80">
                      {module.stressTest.title}
                    </h3>
                     <ul className="space-y-3">
                        {module.stressTest.content.map((item, i) => (
                          <li key={i} className="text-sm font-mono opacity-80 leading-tight">
                            [!] {item}
                          </li>
                        ))}
                     </ul>
                  </div>
                )}

                {/* Evidence Links (Generic sidebar list) */}
                {module.evidence && module.evidence.length > 0 && module.id !== ModuleType.ARTIFACTS && (
                  <div>
                     <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-70">Artifacts</h3>
                     <div className="space-y-4">
                        {module.evidence.map((ev, i) => {
                          const isExternal = /^https?:\/\//i.test(ev.link);
                          return (
                          <a
                            key={i}
                            href={ev.link}
                            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="block group/link"
                          >
                            <div className="flex justify-between items-baseline border-b border-current/20 pb-2 mb-1">
                               <span className="font-sans font-bold group-hover/link:underline">{ev.title}</span>
                               <ExternalLink className="w-3 h-3 opacity-50" />
                            </div>
                            <div className="font-mono text-[10px] opacity-60 leading-tight">
                              {ev.description}
                            </div>
                          </a>
                        );
                        })}
                     </div>
                  </div>
                )}

                {/* Action */}
                <button 
                  onClick={() => onInquiryRequest(`${module.title} — ${module.promptText}`)}
                  className="mt-auto group/btn flex items-center justify-between w-full p-4 border border-current hover:bg-white hover:text-black transition-colors"
                >
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">Inspect This Module</span>
                  <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
