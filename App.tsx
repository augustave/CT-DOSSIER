import React, { useState, useEffect } from 'react';
import { CONTENT_MODULES } from './constants';
import { ModuleStrata } from './components/ModuleStrata';
import { InquiryPanel } from './components/InquiryPanel';

const App: React.FC = () => {
  const [openModuleIndex, setOpenModuleIndex] = useState<string | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<string>("");

  // Handle initialization (Deep Link > LocalStorage > Default Module 02)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#module-')) {
      const index = hash.replace('#module-', '');
      setOpenModuleIndex(index);
    } else {
      try {
        const lastModule = localStorage.getItem('founder:lastModuleId');
        if (lastModule) {
          setOpenModuleIndex(lastModule);
        } else {
          setOpenModuleIndex("02"); // Default landing module per PRD
        }
      } catch (e) {
        // Fallback for strict privacy modes blocking localStorage
        setOpenModuleIndex("02");
      }
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

  // Persistence
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
      // clear hash without jump, safely handling environment restrictions
      try {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      } catch (e) {
        console.warn("Could not update history state (likely sandboxed environment):", e);
      }
      
      try {
        localStorage.removeItem('founder:lastModuleId');
      } catch (e) { /* ignore */ }
    } else {
      setOpenModuleIndex(index);
      // update hash
      try {
        window.location.hash = `module-${index}`;
      } catch (e) {
         console.warn("Could not update location hash:", e);
      }
    }
  };

  const handleInquiryRequest = (context: string) => {
    setInquiryContext(context);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen w-full relative">
      
      {/* Navigation / Brand Overlay */}
      <div className="fixed top-0 left-0 w-full z-40 pointer-events-none mix-blend-difference text-white px-4 py-4 md:px-8 flex justify-between items-start">
         <div className="font-sans font-black text-xl tracking-tightest leading-none pointer-events-auto cursor-pointer" onClick={() => window.scrollTo(0,0)}>
           FOUNDER<br/>DOSSIER
         </div>
         <div className="hidden md:block font-mono text-[10px] text-right opacity-70">
           V1.0.1 <br/> NO API
         </div>
      </div>

      <main className="w-full">
        {CONTENT_MODULES.map((module) => (
          <ModuleStrata 
            key={module.id} 
            module={module} 
            isOpen={openModuleIndex === module.index}
            onToggle={() => handleToggle(module.index)}
            onInquiryRequest={handleInquiryRequest}
          />
        ))}

        {/* Footer Strata */}
        <footer className="w-full py-24 bg-white text-black border-t border-black/10">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center md:text-left">
            <h2 className="font-sans text-9xl font-bold tracking-tighter opacity-5 mb-8">END</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-between items-baseline">
              <p className="font-serif italic text-2xl max-w-md">
                "The list is the narrative. Data is poetry. Organize the chaos."
              </p>
              <button 
                onClick={() => handleInquiryRequest("General Inquiry")}
                className="font-mono text-sm uppercase tracking-widest border-b border-black hover:pb-1 transition-all"
              >
                Initiate Contact -&gt;
              </button>
            </div>
          </div>
        </footer>
      </main>

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