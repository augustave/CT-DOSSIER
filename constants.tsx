import React from 'react';
import { ModuleData, ModuleType } from './types';

export const COLORS = {
  blue: 'bg-strata-blue text-white border-white/20 theme-blue',
  cream: 'bg-strata-cream text-strata-black border-strata-black/20',
  black: 'bg-strata-black text-white border-white/20 theme-dark',
  clay: 'bg-strata-clay text-white border-white/20 theme-brown',
};

export const RECRUIT_CARDS = [
  {
    name: "Michael Levin",
    role: "Tufts / Bioelectricity",
    capability: "Treats living systems as programmable collectives.",
    prevents: "Systems that won’t cohere.",
    desc: "Finds control layers (bioelectricity, pattern memory) that let complex systems self-organize toward a target outcome."
  },
  {
    name: "Chase Hughes",
    role: "Behavioral Engineering",
    capability: "Operationalizes human behavior under uncertainty.",
    prevents: "Humans that won’t align.",
    desc: "Turns trust, resistance, incentives, and negotiation into observable signals and repeatable protocols."
  },
  {
    name: "Kelly Johnson",
    role: "Skunk Works",
    capability: "Ruthless execution under constraint.",
    prevents: "Projects that won’t ship.",
    desc: "Simplicity as a weapon, small elite teams, tight feedback loops, shipping the “impossible”."
  }
];

export const CONTENT_MODULES: ModuleData[] = [
  {
    id: ModuleType.MANIFEST,
    index: "00",
    title: "MANIFEST",
    promptText: "NAVIGATION INDEX",
    themeColor: 'cream',
    responseText: "Select a stratum to jump to its coordinates.",
    responseDisplay: "Select a stratum to jump to its coordinates.",
    // Custom component handles the list
  },
  {
    id: ModuleType.THESIS,
    index: "01",
    title: "FOUNDER",
    promptText: "CORE THESIS",
    themeColor: 'blue',
    responseText: "I build systems that survive contact with reality. Not apps. Not decks. Control stacks: sensing → interpretation → decision → action → proof. My advantage is not a single idea—it’s a repeatable method: organize chaos into legible choices, ship the smallest closed loop, then harden it until it can be trusted.",
    responseDisplay: (
      <div className="space-y-8">
        <div className="font-mono text-sm leading-relaxed opacity-80 border-l-2 border-white/30 pl-4">
          FILE: FOUNDER_MODEL v1.0<br/>
          MODE: COHERENCE / TEMPO / PROOF<br/>
          NO API. NO PERFORMANCE THEATER.
        </div>
        <div className="font-serif text-2xl md:text-4xl leading-relaxed">
          I build systems that survive contact with reality.<br/>
          Not apps. Not decks. <strong>Control stacks</strong>: sensing → interpretation → decision → action → proof.
        </div>
        <div className="font-sans text-lg md:text-xl max-w-2xl opacity-90">
          My advantage is not a single idea—it’s a repeatable method: <strong>organize chaos into legible choices</strong>, ship the smallest closed loop, then harden it until it can be trusted.
        </div>
      </div>
    ),
    implications: {
      title: "INDEX",
      content: [
        "01 COHERENCE — parts become a whole",
        "02 TEMPO — speed beats drift",
        "03 PROOF — audit trails over vibes"
      ]
    },
    stressTest: {
      title: "NOTE",
      content: [
        "Default output is deterministic.",
        "Interpretation is rules-based.",
        "If you want magic, try the circus."
      ]
    }
  },
  {
    id: ModuleType.RECRUITS,
    index: "02",
    title: "THE RECRUITMENT TRIAD",
    promptText: "SPC PROMPT — WHO ARE THREE PEOPLE YOU WOULD RECRUIT REGARDLESS OF WHAT YOU DO? WHAT MAKES THEM SPECIAL?",
    themeColor: 'cream',
    responseText: "Michael Levin, Chase Hughes, Kelly Johnson. Together they cover the three universal failure modes.",
    responseDisplay: (
      <div className="space-y-8">
        <ul className="space-y-4">
          <li className="font-sans text-lg md:text-xl leading-relaxed">
            <strong>Michael Levin</strong> — programs coherence in living systems; finds control layers for self-organization and repair.
          </li>
          <li className="font-sans text-lg md:text-xl leading-relaxed">
            <strong>Chase Hughes</strong> — operationalizes human behavior under uncertainty; turns messy human dynamics into protocols.
          </li>
          <li className="font-sans text-lg md:text-xl leading-relaxed">
            <strong>Kelly Johnson</strong> — ships the impossible under constraint; simplicity, tempo, feedback loops.
          </li>
        </ul>
        <p className="font-serif text-xl md:text-2xl leading-relaxed opacity-90">
          I recruit this triad because together they cover the three universal failure modes:
          systems that won’t cohere, humans that won’t align, projects that won’t ship.
        </p>
      </div>
    ),
    // Implications removed as they are now integrated into the response
  },
  {
    id: ModuleType.MODEL,
    index: "03",
    title: "FOUNDER MODEL",
    promptText: "FOUNDER TYPE — RESULT",
    themeColor: 'black',
    responseText: "My founder archetype is the Wartime General. I optimize for tempo in low-information environments.",
    responseDisplay: (
      <div className="space-y-8">
        <div>
           <div className="font-serif text-2xl md:text-4xl leading-relaxed mb-4">
             My founder archetype is the <strong>Wartime General</strong>.
           </div>
           <p className="font-sans text-lg md:text-xl opacity-90 leading-relaxed">
             I optimize for tempo in low-information environments.<br/>
             I ship imperfect systems to buy signal, then harden them into something people can trust.
           </p>
        </div>

        <div className="space-y-2">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-60">My default operating bias:</h4>
           <ul className="list-disc pl-4 space-y-1 font-sans opacity-90">
             <li>Systems are control problems (feedback loops, incentives, constraints).</li>
             <li>Reality is layered (a stack of interacting subsystems).</li>
             <li>Execution is a design material, not a project-management chore.</li>
           </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/20">
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">Primary failure mode:</h4>
              <p className="font-sans font-bold">Technical debt accumulation</p>
              <p className="font-sans text-sm opacity-70">(tempo outruns cleanup)</p>
           </div>
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">Mitigation:</h4>
              <p className="font-sans font-bold">Scheduled refactor sprints enforced as policy.</p>
           </div>
        </div>
      </div>
    ),
    // Implications/Stress Test removed as they are integrated into response
  },
  {
    id: ModuleType.COMPANIES,
    index: "04",
    title: "COMPANIES I'D BUILD",
    promptText: "ARCHETYPES & WEDGES",
    themeColor: 'clay',
    responseText: "I’m interested in Truth Infrastructure — tools that verify reality in low-trust environments.",
    responseDisplay: (
      <div className="space-y-8">
        <p className="font-serif text-xl md:text-3xl leading-relaxed">
          I’m interested in <strong>Truth Infrastructure</strong> — tools that verify reality in low-trust environments.<br/>
          <span className="text-lg md:text-2xl opacity-80 block mt-2">Think supply chain verification, automated compliance, or synthetic media detection.</span>
        </p>

        <div className="bg-black/5 p-6 border border-black/10">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">THE WEDGE</h4>
           <ul className="space-y-2 font-mono text-sm">
             <li>01 Target: Mid-market regulated industries (FinTech, BioTech).</li>
             <li>02 Offer: Automated audit preparedness.</li>
             <li>03 First 30 Days: Deploy a read-only probe that surfaces compliance gaps instantly.</li>
           </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div>
             <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">The company form:</h4>
             <ul className="list-disc pl-4 space-y-1 font-sans opacity-90">
               <li>Start with a services wedge to learn the terrain, then productize into SaaS.</li>
               <li>Field demos over decks.</li>
               <li>Auditability over hype.</li>
               <li>Small elite teams with hard opinions about execution.</li>
             </ul>
           </div>
           <div>
             <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">Real-world analogs (signal match):</h4>
             <ul className="list-disc pl-4 space-y-1 font-sans opacity-90">
               <li>Palantir (decision infrastructure)</li>
               <li>Anduril (field deployment under constraint)</li>
               <li>Axon (evidence infrastructure)</li>
               <li>Samsara (physical operations telemetry)</li>
               <li>Verkada (sensor + cloud platform)</li>
               <li>Vanta (trust/compliance automation)</li>
             </ul>
           </div>
        </div>
      </div>
    ),
    // Implications removed
  },
  {
    id: ModuleType.SIMULATOR,
    index: "05",
    title: "OPERATING SIMULATOR",
    promptText: "INTERACTIVE SCENARIO PLANNING",
    themeColor: 'blue',
    responseText: "Input your constraints to see how my founder model adapts. This is a deterministic mapping of my operating principles against market realities.",
    responseDisplay: "Input your constraints to see how my founder model adapts. This is a deterministic mapping of my operating principles against market realities.",
    // No standard subsections, custom component used
  }
];

export const INQUIRY_OPTIONS = {
  assess: [
    "Product Velocity",
    "Technical Depth",
    "Go-to-Market Instincts",
    "Leadership Style",
    "Coachability"
  ],
  challenge: [
    "Market Sizing",
    "Hiring Strategy",
    "Burn Rate Hypotheses",
    "Competitive Moat",
    "Exit Strategy"
  ]
};

export const INQUIRY_QUESTIONS: Record<string, string[]> = {
  // ASSESS
  "Product Velocity": [
    "What can you ship in 14 days that closes a full loop (detect → decide → act → log)?",
    "What do you deliberately not build in the first month?",
    "What is your demo cadence (weekly artifact) and what’s the acceptance bar?",
    "Where do you prototype fastest: UI, workflow, or field instrumentation—why?"
  ],
  "Technical Depth": [
    "Which parts do you understand at the systems level vs. 'delegated to specialists'?",
    "What are your hard constraints: latency, reliability, privacy, auditability?",
    "Where is the model vs. where is the workflow doing the heavy lifting?",
    "What would you instrument on day 1 to make the system testable?"
  ],
  "Go-to-Market Instincts": [
    "Who is the first operator you’re selling to, and what do they already pay for today?",
    "What’s the single wedge that earns permission for expansion?",
    "What channel wins first: founder-led outbound, partnerships, or embedded distribution?",
    "What is the 'I can’t go back' moment for the user?"
  ],
  "Leadership Style": [
    "How do decisions get made when the team disagrees—what’s the escalation rule?",
    "How do you run execution: daily cadence, weekly truth review, or sprint gates?",
    "What behavior do you reward early: speed, correctness, or initiative?",
    "How do you protect small-team tempo as complexity increases?"
  ],
  "Coachability": [
    "What’s a recent belief you changed after new evidence?",
    "How do you prefer feedback: blunt / written / live debate / asynchronous?",
    "What’s your rule for deciding whose advice to ignore?",
    "What do you track weekly to prevent self-deception?"
  ],
  // CHALLENGE
  "Market Sizing": [
    "What market are you actually in today, not eventually?",
    "What is the smallest segment that still returns venture-scale outcomes?",
    "What substitutes exist that make this market 'look solved'?"
  ],
  "Hiring Strategy": [
    "Who is hire #1 and what capability is absolutely missing without them?",
    "What work do you refuse to outsource early?",
    "What kind of person fails on this team even if they’re talented?"
  ],
  "Burn Rate Hypotheses": [
    "What’s your default cheap mode and what costs are non-negotiable?",
    "What runway do you assume before meaningful revenue—and why?",
    "What do you measure weekly to prevent 'quiet burn' (tools, contractors, churn)?"
  ],
  "Competitive Moat": [
    "What becomes defensible after 3–6 deployments that a copycat can’t replicate fast?",
    "Where is the moat: data flywheel, workflow lock-in, distribution, or trust?",
    "What is the unfair advantage you can compound weekly?"
  ],
  "Exit Strategy": [
    "Who are the natural acquirers and what do they buy: tech, distribution, or data?",
    "What does an 'independent outcome' look like if no one buys you?"
  ]
};