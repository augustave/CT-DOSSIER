import React, { useState, useEffect } from 'react';
import { CONTENT_MODULES } from './constants';
import { ModuleStrata } from './components/ModuleStrata';
import { InquiryPanel } from './components/InquiryPanel';
import { ManifestOverlay } from './components/ManifestOverlay';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [openModuleIndex, setOpenModuleIndex] = useState<string | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<string>("");

  // Handle initialization (Deep Link > LocalStorage > Default Module 02)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#module-')) {
      const index = hash.replace('#module-', '');
      setOpenModuleIndex(index);
    } else {
        // PRD Requirement: Force default to #02 if no hash
        // We override previous logic that checked localStorage first for privacy/mandate reasons
        // But we can keep localStorage check if desired, but PRD says "On load: if no hash -> set #02."
        // Let's bias towards the mandate.
        setOpenModuleIndex("02");
        // Update URL to match without scrolling (yet)
        try {
            history.replaceState(null, document.title, '#module-02');
        } catch(e) {}
    }

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash.startsWith('#module-')) {
        const index = currentHash.replace('#module-', '');
        setOpenModuleIndex(index);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persistence (Optional, kept for state recovery if user navigates back)
  useEffect(() => {
    if (openModuleIndex) {
      try {
        localStorage.setItem('founder:lastModuleId', openModuleIndex);
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }, [openModuleIndex]);

  const handleToggle = (index: string) => {
    if (openModuleIndex === index) {
      setOpenModuleIndex(null);
      // clear hash without jump
      try {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      } catch (e) {}
    } else {
      setOpenModuleIndex(index);
       try {
        window.location.hash = `module-${index}`;
      } catch (e) {}
    }
  };

  const handleIndexNavigate = (index: string) => {
      setIsIndexOpen(false);
      // Small delay to allow overlay to close before scrolling/expanding
      setTimeout(() => {
          handleToggle(index);
          // Ensure it's open if it wasn't
          setOpenModuleIndex(index);
          window.location.hash = `module-${index}`;
      }, 300);
  };

  const handleInquiryRequest = (context: string) => {
    setInquiryContext(context);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen w-full relative">
      
      {/* Navigation / Brand Overlay */}
      <div className="fixed top-0 left-0 w-full z-40 pointer-events-none px-4 py-4 md:px-8 flex justify-between items-start">
         <div className="font-sans font-black text-xl tracking-tightest leading-none pointer-events-auto cursor-pointer text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" onClick={() => window.scrollTo(0,0)}>
           FOUNDER<br/>DOSSIER
         </div>
         
         <div className="flex flex-col items-end gap-2 pointer-events-auto">
             <div className="flex items-center gap-4">
               <button 
                  onClick={() => handleInquiryRequest("General Inquiry")}
                  className="hidden md:block font-mono text-xs uppercase tracking-widest border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
               >
                  INITIATE CONTACT -&gt;
               </button>
               <button 
                  onClick={() => setIsIndexOpen(true)}
                  className="font-mono text-xs uppercase tracking-widest border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
               >
                  INDEX (00)
               </button>
             </div>
             <div className="hidden md:block font-mono text-[10px] text-right text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
               V1.0.2 <br/> NO API
             </div>
         </div>
      </div>

      <main className="w-full">
        {/* Render all modules EXCEPT Manifest (Module 00) */}
        {CONTENT_MODULES.filter(m => m.id !== ModuleType.MANIFEST).map((module) => (
          <ModuleStrata 
            key={module.id} 
            module={module} 
            isOpen={openModuleIndex === module.index}
            onToggle={() => handleToggle(module.index)}
            onInquiryRequest={handleInquiryRequest}
          />
        ))}


        {/* Footer Restored per PRD v1.0.2 */}
        <footer className="w-full py-12 md:py-24 bg-white text-black border-t border-black/10 mt-12">
           <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row justify-between items-baseline gap-8">
              <div>
                <h3 className="font-sans font-bold tracking-tightest text-xl mb-2">FOUNDER DOSSIER</h3>
                <p className="font-mono text-xs opacity-50">v1.0.2 + NO API</p>
              </div>
              <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
                 <button onClick={() => setIsIndexOpen(true)} className="hover:underline">Index</button>
                 <button onClick={() => handleInquiryRequest("Footer Contact")} className="hover:underline">Initiate Contact</button>
              </div>
           </div>
        </footer>
      </main>

      {/* Manifest Overlay */}
      <ManifestOverlay 
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        onNavigate={handleIndexNavigate}
      />

      {/* Slide-over Panel */}
      <InquiryPanel 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)}
        context={inquiryContext}
      />
    </div>
  );
};

export default App;