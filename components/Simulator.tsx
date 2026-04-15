import React, { useState, useEffect } from 'react';
import { MessageSquarePlusIcon } from './icons';

type Optimization = 'NARRATIVE' | 'SYSTEMS' | 'EXECUTION';
type Environment = 'CONCEPT' | 'PRODUCT' | 'MISSION';

interface SimulationResult {
  archetype: string;
  description: string;
  risk: string;
  mitigation: string;
}

interface SimulatorProps {
  onInquiryRequest: (context: string) => void;
}

const RESULTS: Record<string, SimulationResult> = {
  'NARRATIVE-CONCEPT': {
    archetype: "CONCEPT VISUALIZER",
    description: "Best used when a new idea needs sharp framing, mockups, diagrams, and fast narrative clarity before the product direction is stable.",
    risk: "Beautiful framing without enough behavioral proof.",
    mitigation: "Move from static narrative into one functional prototype as quickly as possible."
  },
  'NARRATIVE-PRODUCT': {
    archetype: "PRODUCT STORY SYSTEMS DESIGNER",
    description: "Useful when a product needs stronger hierarchy, launch narrative, and interface coherence at the same time.",
    risk: "The story outruns the actual interface detail.",
    mitigation: "Tie every narrative claim to a concrete screen, flow, or artifact."
  },
  'NARRATIVE-MISSION': {
    archetype: "OPERATIONAL STORYTELLER",
    description: "Strong fit for defense or mission work where strategic stakes must be visible without collapsing into theater.",
    risk: "Signal can become too cinematic if the proof layer is thin.",
    mitigation: "Keep documentation, provenance, and system logic visible inside the presentation layer."
  },
  'SYSTEMS-CONCEPT': {
    archetype: "VISUAL SYSTEMS ARCHITECT",
    description: "Strongest when the team needs a grammar before it needs a full product: rules, components, hierarchy, tokens, and interface logic.",
    risk: "Too much system too early for a still-fluid concept.",
    mitigation: "Prototype one representative slice before formalizing the full language."
  },
  'SYSTEMS-PRODUCT': {
    archetype: "CREATIVE TECHNOLOGIST",
    description: "Best role fit for building coherent front-end systems, prototypes, and evidence artifacts that help product and engineering converge.",
    risk: "Range can get flattened into 'just visual design' or 'just front-end.'",
    mitigation: "Scope the role explicitly across concept, prototype behavior, and system articulation."
  },
  'SYSTEMS-MISSION': {
    archetype: "HIGH-ASSURANCE INTERFACE DESIGNER",
    description: "Strong fit for mission software, autonomy, geospatial, or consequential tooling where trust and legibility matter as much as interaction quality.",
    risk: "The domain can absorb time into research and documentation overhead.",
    mitigation: "Anchor the work in one operator workflow and one proof artifact at a time."
  },
  'EXECUTION-CONCEPT': {
    archetype: "RAPID PROTOTYPER",
    description: "Useful when the team needs to learn quickly through artifact velocity rather than debate.",
    risk: "Velocity can outpace codification.",
    mitigation: "Package what works into reusable patterns after each sprint."
  },
  'EXECUTION-PRODUCT': {
    archetype: "PRODUCT ACCELERATOR",
    description: "Best fit when an existing product needs sharper interaction, stronger visual rigor, and a working prototype path instead of another static redesign.",
    risk: "Can become the catch-all for every design edge case.",
    mitigation: "Define the first 90-day problems narrowly and show what success looks like."
  },
  'EXECUTION-MISSION': {
    archetype: "MISSION PROTOTYPE LEAD",
    description: "Useful when a technical or defense-facing team needs believable demos, interface studies, and stakeholder-ready proof artifacts fast.",
    risk: "High pressure can reward speed over explicit documentation.",
    mitigation: "Keep a visible audit trail of decisions, assumptions, and interaction rules."
  }
};

export const Simulator: React.FC<SimulatorProps> = ({ onInquiryRequest }) => {
  const [opt, setOpt] = useState<Optimization>('SYSTEMS');
  const [env, setEnv] = useState<Environment>('PRODUCT');
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const key = `${opt}-${env}`;
    setResult(RESULTS[key] || RESULTS['SYSTEMS-PRODUCT']);
  }, [opt, env]);

  return (
    <div className="border border-white/20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
        <div className="p-8 space-y-8">
          <div>
            <h3 className="font-mono text-micro uppercase tracking-widest text-white/60 mb-4">Input 01: Work Lens</h3>
            <div className="flex flex-col gap-2">
              {(['NARRATIVE', 'SYSTEMS', 'EXECUTION'] as Optimization[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setOpt(val)}
                  className={`px-4 py-3 font-mono text-xs uppercase tracking-widest border transition-all text-left ${
                    opt === val
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-white/70 border-white/20 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-micro uppercase tracking-widest text-white/60 mb-4">Input 02: Team Context</h3>
            <div className="flex flex-col gap-2">
              {(['CONCEPT', 'PRODUCT', 'MISSION'] as Environment[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setEnv(val)}
                  className={`px-4 py-3 font-mono text-xs uppercase tracking-widest border transition-all text-left ${
                    env === val
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-white/70 border-white/20 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-between min-h-[400px]">
          {result && (
            <>
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-micro uppercase tracking-widest text-green-500/80">Analysis Complete</span>
                </div>

                <div>
                  <h4 className="font-sans text-3xl md:text-4xl font-bold uppercase leading-tight mb-4">{result.archetype}</h4>
                  <p className="font-serif text-lg md:text-xl italic opacity-secondary leading-relaxed">&ldquo;{result.description}&rdquo;</p>
                </div>

                <div className="pt-6 border-t border-white/10 grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-mono text-micro uppercase tracking-widest opacity-muted mb-2">Watch For</h5>
                    <p className="font-sans font-bold text-sm md:text-base">{result.risk}</p>
                  </div>
                  <div>
                    <h5 className="font-mono text-micro uppercase tracking-widest opacity-muted mb-2">Best Counter-Balance</h5>
                    <p className="font-sans text-sm md:text-base opacity-secondary">{result.mitigation}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onInquiryRequest(`Role Matrix: ${result.archetype}`)}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-white text-black p-3 font-mono text-xs uppercase tracking-widest hover:bg-white/90 transition-colors border border-white"
              >
                <MessageSquarePlusIcon className="w-3 h-3" /> Discuss this fit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
