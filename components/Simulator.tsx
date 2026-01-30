import React, { useState, useEffect } from 'react';
import { AlertTriangle, MessageSquarePlus } from 'lucide-react';

type Optimization = 'SPEED' | 'CORRECTNESS' | 'SCALE';
type Environment = 'CHAOS' | 'ENTERPRISE' | 'REGULATED';

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
  'SPEED-CHAOS': {
    archetype: "THE WARTIME GENERAL",
    description: "Optimizes for tempo in low-information environments. Ships imperfect systems to buy signal.",
    risk: "Technical Debt Accumulation",
    mitigation: "Scheduled refactor sprints enforced as policy."
  },
  'SPEED-ENTERPRISE': {
    archetype: "THE INSURGENT",
    description: "Uses speed as a wedge to displace incumbents. Focuses on 'Land and Expand' tactics.",
    risk: "Compliance Bypass",
    mitigation: "Hire a 'No' person (General Counsel) early."
  },
  'SPEED-REGULATED': {
    archetype: "THE BLOCKADE RUNNER",
    description: "Finds loopholes in regulatory frameworks to ship faster than legal allows.",
    risk: "Existential Legal Threat",
    mitigation: "Build distinct legal entities for experimental features."
  },
  'CORRECTNESS-CHAOS': {
    archetype: "THE ACADEMIC",
    description: "Imposes order on chaos through rigid first-principles modeling. Slow start, exponential finish.",
    risk: "Missing Market Window",
    mitigation: "Time-boxed research phases with hard stop dates."
  },
  'CORRECTNESS-ENTERPRISE': {
    archetype: "THE ARCHITECT",
    description: "Builds systems that cannot fail. High upfront cost, near-zero maintenance. Enterprise-grade from Day 1.",
    risk: "Over-Engineering",
    mitigation: "Sell the 'prototype' before building the 'platform'."
  },
  'CORRECTNESS-REGULATED': {
    archetype: "THE INSTITUTIONALIST",
    description: "The perfect fit for BioTech/FinTech. Accuracy is the product. Trust is the currency.",
    risk: "Bureaucratic Ossification",
    mitigation: "Keep a 'Skunk Works' team entirely off-grid."
  },
  'SCALE-CHAOS': {
    archetype: "THE VIRAL MECHANIC",
    description: "Builds self-replicating loops. Doesn't care about the unit, cares about the network effect.",
    risk: "Churn / Hollow Growth",
    mitigation: "Aggressive focus on retention cohorts over top-line users."
  },
  'SCALE-ENTERPRISE': {
    archetype: "THE PLATFORM BUILDER",
    description: "Creating the OS for an industry. API-first. Low-touch, high-leverage.",
    risk: "Integration Hell",
    mitigation: "Narrow the ICP to one specific vertical before horizontal expansion."
  },
  'SCALE-REGULATED': {
    archetype: "THE INFRASTRUCTURE SOVEREIGN",
    description: "Becoming the 'plumbing' of a high-stakes industry. Boring, massive, indispensable.",
    risk: "Regulatory Capture (Inverse)",
    mitigation: "Lobbying as a core product feature."
  }
};

export const Simulator: React.FC<SimulatorProps> = ({ onInquiryRequest }) => {
  const [opt, setOpt] = useState<Optimization>('SPEED');
  const [env, setEnv] = useState<Environment>('CHAOS');
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const key = `${opt}-${env}`;
    setResult(RESULTS[key] || RESULTS['SPEED-CHAOS']);
  }, [opt, env]);

  return (
    <div className="border border-white/20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
        {/* Left Column: Controls */}
        <div className="p-8 space-y-8">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-4">Input 01: Priority</h3>
            <div className="flex flex-col gap-2">
              {(['SPEED', 'CORRECTNESS', 'SCALE'] as Optimization[]).map((val) => (
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
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-4">Input 02: Environment</h3>
            <div className="flex flex-col gap-2">
              {(['CHAOS', 'ENTERPRISE', 'REGULATED'] as Environment[]).map((val) => (
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

        {/* Right Column: Output */}
        <div className="p-8 flex flex-col justify-between min-h-[400px]">
          {result && (
            <>
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-green-500/80">Analysis Complete</span>
                </div>
                
                <div>
                  <h4 className="font-sans text-3xl md:text-4xl font-bold uppercase leading-tight mb-4">{result.archetype}</h4>
                  <p className="font-serif text-lg md:text-xl italic opacity-90 leading-relaxed">&ldquo;{result.description}&rdquo;</p>
                </div>

                <div className="pt-6 border-t border-white/10 grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">Primary Risk</h5>
                    <p className="font-sans font-bold text-sm">{result.risk}</p>
                  </div>
                  <div>
                    <h5 className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">Mitigation</h5>
                    <p className="font-sans text-sm opacity-80">{result.mitigation}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onInquiryRequest(`Simulator Result: ${result.archetype} (${result.risk})`)}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-white text-black p-3 font-mono text-xs uppercase tracking-widest hover:bg-white/90 transition-colors border border-white"
              >
                <MessageSquarePlus className="w-3 h-3" /> Discuss this outcome
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};