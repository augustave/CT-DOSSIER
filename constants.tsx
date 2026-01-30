import React from 'react';
import { ModuleData, ModuleType } from './types';

export const COLORS = {
  blue: 'bg-strata-blue text-white border-white/20',
  cream: 'bg-strata-cream text-strata-black border-strata-black/20',
  black: 'bg-strata-black text-white border-white/20',
  clay: 'bg-strata-clay text-white border-white/20',
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
    promptText: "SPC PROMPT — Who are three people you would recruit regardless of what you do? What makes them special?",
    themeColor: 'cream',
    responseText: "Michael Levin (Systems), Chase Hughes (Humans), Kelly Johnson (Execution).",
    responseDisplay: (
      <div className="space-y-6">
        <ul className="space-y-6">
          <li className="flex flex-col md:flex-row gap-1 md:gap-3">
            <strong className="font-serif text-2xl md:text-3xl">Michael Levin</strong>
            <span className="font-sans text-lg md:text-xl opacity-80 leading-relaxed md:pt-1">— programs coherence in living systems; finds control layers for self-organization and repair.</span>
          </li>
          <li className="flex flex-col md:flex-row gap-1 md:gap-3">
            <strong className="font-serif text-2xl md:text-3xl">Chase Hughes</strong>
            <span className="font-sans text-lg md:text-xl opacity-80 leading-relaxed md:pt-1">— operationalizes human behavior under uncertainty; turns messy human dynamics into protocols.</span>
          </li>
          <li className="flex flex-col md:flex-row gap-1 md:gap-3">
            <strong className="font-serif text-2xl md:text-3xl">Kelly Johnson</strong>
            <span className="font-sans text-lg md:text-xl opacity-80 leading-relaxed md:pt-1">— ships the impossible under constraint; simplicity, tempo, feedback loops.</span>
          </li>
        </ul>
      </div>
    ),
    implications: {
      title: "WHAT THIS SAYS ABOUT MY MODEL",
      content: [
        "I value biological adaptability over rigid mechanical hierarchy.",
        "I view human psychology as a solvable engineering constraint, not a mystical art.",
        "I believe small, unauthorized teams outperform large, sanctioned ones (Skunk Works model)."
      ]
    },
    evidence: [
      {
        title: "Previous Team Structure",
        description: "Post-mortem on how a team of 4 shipped a Series A product.",
        link: "#"
      },
      {
        title: "Hiring Protocol",
        description: "My standard operating procedure for vetting technical talent.",
        link: "#"
      }
    ]
  },
  {
    id: ModuleType.MODEL,
    index: "03",
    title: "FOUNDER MODEL",
    promptText: "OPERATING PRINCIPLES & FAILURE MODES",
    themeColor: 'black',
    responseText: "I operate as a benevolent dictator of the spec, but a servant to the data. My role is to maintain the 'clean room' where the team can execute without bureaucratic friction.",
    responseDisplay: "I operate as a benevolent dictator of the spec, but a servant to the data. My role is to maintain the 'clean room' where the team can execute without bureaucratic friction.",
    implications: {
      title: "FAILURE MODES & MITIGATIONS",
      content: [
        "Failure: Analysis Paralysis. Mitigation: 'Disagree and Commit' triggers after 24 hours.",
        "Failure: Feature Creep. Mitigation: Ruthless cutting of any feature that doesn't serve the primary KPI.",
        "Failure: Burnout. Mitigation: Mandatory disconnect periods after sprint cycles."
      ]
    },
    stressTest: {
      title: "BLIND SPOTS",
      content: [
        "I tend to undervalue 'polish' in favor of raw functionality.",
        "I may push for automation before manual processes are fully stable.",
        "I assume high-agency from all employees, which requires rigorous filtering."
      ]
    }
  },
  {
    id: ModuleType.COMPANIES,
    index: "04",
    title: "COMPANIES I'D BUILD",
    promptText: "ARCHETYPES & WEDGES",
    themeColor: 'clay',
    responseText: "I am interested in 'Truth Infrastructure'—tools that verify reality in low-trust environments. Think supply chain verification, automated compliance, or synthetic media detection.",
    responseDisplay: "I am interested in 'Truth Infrastructure'—tools that verify reality in low-trust environments. Think supply chain verification, automated compliance, or synthetic media detection.",
    implications: {
      title: "THE WEDGE",
      content: [
        "Target: Mid-market regulated industries (FinTech, BioTech).",
        "Offer: Automated audit preparedness.",
        "First 30 Days: Deploy a 'read-only' probe to demonstrate compliance gaps instantly."
      ]
    },
    evidence: [
      {
        title: "Market Thesis Deck",
        description: "Deep dive into the 'Trust Deficit' opportunity.",
        link: "#"
      },
      {
        title: "Prototype Repo",
        description: "GitHub link to a basic verifier node.",
        link: "#"
      }
    ]
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
  },
  {
    id: ModuleType.ARTIFACTS,
    index: "06",
    title: "EVIDENCE LOCKER",
    promptText: "PROOF / ARTIFACTS",
    themeColor: 'black',
    responseText: "The raw data. Decks, repositories, and writing that substantiate the claims made in previous strata.",
    responseDisplay: "The raw data. Decks, repositories, and writing that substantiate the claims made in previous strata.",
    evidence: [
      {
        title: "Series A Memo",
        description: "The original investment memo for my last company.",
        link: "#"
      },
      {
        title: "System Architecture Diagram",
        description: "High-level topology of the Truth Infrastructure stack.",
        link: "#"
      },
      {
        title: "Essay: 'The End of Trust'",
        description: "3,000 word manifesto on why verification is the next big market.",
        link: "#"
      },
      {
        title: "Open Source Contributions",
        description: "Direct links to my core commits in major crypto/security repos.",
        link: "#"
      }
    ]
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