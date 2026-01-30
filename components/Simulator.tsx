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
    <div className="bg-strata-black text-white p-8 border border-white/10 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-9xl font-bold select-none pointer-events-none">
        SIM
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">Input 01: Priority</h3>
            <div className="flex flex-wrap gap-2">
              {(['SPEED', 'CORRECTNESS', 'SCALE'] as Optimization[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setOpt(val)}
                  className={`px-4 py-2 font-mono text-xs border transition-all ${
                    opt === val 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white/50 border-white/20 hover:border-white/50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">Input 02: Environment</h3>
            <div className="flex flex-wrap gap-2">
              {(['CHAOS', 'ENTERPRISE', 'REGULATED'] as Environment[]).map((val) => (
                <button
                  key={val}
                  onClick={() => setEnv(val)}
                  className={`px-4 py-2 font-mono text-xs border transition-all ${
                    env === val 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white/50 border-white/20 hover:border-white/50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Console */}
        <div className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between min-h-[250px]">
          {result && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-green-500">Analysis Complete</span>
                </div>
                <h4 className="font-sans text-3xl font-bold uppercase leading-none mb-4">{result.archetype}</h4>
                <p className="font-serif italic text-lg opacity-80 mb-6 leading-relaxed">"{result.description}"</p>
              </div>
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                {/* Risk Block Removed per PRD v1.0.2 */}

                <button 
                  onClick={() => onInquiryRequest(`Simulator Result: ${result.archetype} (${result.risk})`)}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-white text-black p-3 font-mono text-xs uppercase hover:bg-white/90 transition-colors"
                >
                  <MessageSquarePlus className="w-3 h-3" /> Discuss this outcome
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};