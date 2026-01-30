import React, { useRef, useEffect, useState } from 'react';
import { ModuleData, ModuleType } from '../types';
import { COLORS, RECRUIT_CARDS } from '../constants';
import { ChevronDown, ExternalLink, ShieldAlert, Fingerprint, Link as LinkIcon, Check } from 'lucide-react';

const Simulator = React.lazy(() => import('./Simulator').then(module => ({ default: module.Simulator }))); // Lazy load

interface ModuleStrataProps {
  module: ModuleData;
  isOpen: boolean;
  onToggle: () => void;
  onInquiryRequest: (context: string) => void;
}

const CollapsibleDrawer: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: React.ReactNode }> = ({ title, children, defaultOpen = false, icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-current/20 pb-4">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="flex items-center gap-3 w-full text-left font-mono text-xs uppercase tracking-widest font-bold opacity-80 hover:opacity-100 transition-opacitygroup/drawer"
            >
                {icon}
                <span className="group-hover/drawer:underline underline-offset-4">{title}</span>
                <span className="ml-auto opacity-50">{isOpen ? '[-]' : '[+]'}</span>
            </button>
            <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};

export const ModuleStrata: React.FC<ModuleStrataProps> = ({ module, isOpen, onToggle, onInquiryRequest }) => {
  const themeClass = COLORS[module.themeColor];
  const containerRef = useRef<HTMLElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const panelId = `module-panel-${module.index}`;
  const linkStatusId = `module-link-status-${module.index}`;

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

    // Artifacts UI Removed

  return (
    <section 
      ref={containerRef}
      id={`module-${module.index}`} 
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-label={`Toggle ${module.title}`}
      // PRD v1.0.2: scroll-margin-top added for fixed header offset
      className={`relative w-full border-b border-black/10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${themeClass} ${isOpen ? 'py-12 md:py-24' : 'py-8 md:py-12'} cursor-pointer group scroll-mt-[100px]`}
      onClick={(e) => {
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
              aria-describedby={linkStatusId}
              aria-label={`Copy link to ${module.title}`}
              className={`absolute -right-12 top-2 p-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity hidden md:block`}
              title="Copy link to module"
            >
              {linkCopied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
            </button>
            <span id={linkStatusId} className="sr-only" role="status" aria-live="polite">
              {linkCopied ? 'Link copied to clipboard.' : ''}
            </span>
          </div>
          
          
          <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest opacity-60">
             {/* Header Inspect Button - Only visible when open or hovering */}
             <button
                onClick={(e) => {
                    e.stopPropagation();
                    onInquiryRequest(`${module.title} — ${module.promptText}`);
                }}
                className={`hover:opacity-100 hover:underline transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
             >
                + INSPECT
             </button>
            
            <div className="flex items-center gap-2">
                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {isOpen ? 'FOLD' : 'UNFOLD'}
                </span>
                <div className={`transform transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
                </div>
            </div>
          </div>
        </div>

        {/* PRD v1.0.2: Band Preview Mode (Visible when Collapsed) */}
        {!isOpen && (
            <div className="hidden md:grid grid-cols-12 gap-8 mt-4 items-baseline opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="col-span-8 border-l pl-4" style={{ borderColor: 'var(--hairline)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-widest truncate" style={{ color: 'var(--text-muted)' }}>
                        {module.promptText}
                    </p>
                </div>
                <div className="col-span-4">
                     <p className="font-serif italic text-lg opacity-80 truncate">
                        {module.responseText || "View Analysis ->"}
                    </p>
                </div>
            </div>
        )}

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
                <span className="font-mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>
                  Prompt
                </span>
                <div className="font-mono text-xs uppercase tracking-widest border-l-2 pl-4 py-1 leading-relaxed" style={{ color: 'var(--text-primary)', borderColor: 'var(--hairline)' }}>
                  {module.promptText}
                </div>
              </div>

              {/* Response Block */}
              <div className="mb-12">
                 <span className="font-mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>
                  Response
                </span>
                <div className="font-serif text-xl md:text-3xl leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {module.responseDisplay}
                </div>
              </div>

              {/* Collapsible Drawers Stack */}
              <div className="space-y-6 mb-12">
                
                {/* 1. Recruits Cards (Module 02 Specific) */}
                {module.id === ModuleType.RECRUITS && (
                   <CollapsibleDrawer title={`UNFOLD CARDS (+${RECRUIT_CARDS.length})`} defaultOpen={false}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                   </CollapsibleDrawer>
                )}

                {/* 2. Simulator (Module 05) */}
                {module.id === ModuleType.SIMULATOR && (
                  <div className="mt-4 mb-2" onClick={(e) => e.stopPropagation()}>
                    <React.Suspense fallback={<div className="font-mono text-xs animate-pulse">LOADING SIMULATOR...</div>}>
                         <Simulator onInquiryRequest={onInquiryRequest} />
                    </React.Suspense>
                  </div>
                )}

                 {/* 3. Artifacts Removed */}

                {/* 4. Implications (Generic) */}
                {module.implications && (
                   <CollapsibleDrawer title={`${module.implications.title}`} icon={<Fingerprint className="w-4 h-4"/>}>
                       <ul className="space-y-4 mt-4">
                        {module.implications.content.map((item, i) => (
                          <li key={i} className="flex gap-4 items-start pl-4 border-l-2 border-current/30">
                            <span className="font-mono text-xs pt-1 opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                            <span className="font-sans text-lg">{item}</span>
                          </li>
                        ))}
                       </ul>
                   </CollapsibleDrawer>
                )}

              </div>
            </div>

            {/* Column B: Evidence & Actions (Visible when Details Open OR Manifest Hidden) */}
            {module.id !== ModuleType.MANIFEST && (
              <div className={`md:col-span-12 lg:col-span-4 flex flex-col gap-12 transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                
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

                {/* Evidence Links Removed */}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
