import React from 'react';
import { ModuleData, ModuleType } from './types';

import { FOUNDER_COPY_V110 } from './copy.v1_1';
const COPY = FOUNDER_COPY_V110;

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
    title: COPY.modules["01"].title,
    promptText: COPY.modules["01"].prompt,
    themeColor: 'blue',
    responseText: COPY.modules["01"].hero,
    responseDisplay: (
      <div className="space-y-8">
        <div className="font-mono text-sm leading-relaxed opacity-80 border-l-2 border-white/30 pl-4">
          FILE: {COPY.meta.version}<br/>
          MODE: {COPY.modules["01"].noteLines[0]} / {COPY.modules["01"].noteLines[1]}<br/>
          NO API. NO PERFORMANCE THEATER.
        </div>
        <div className="font-serif text-2xl md:text-4xl leading-relaxed">
          {COPY.modules["01"].hero}
        </div>
        <div className="font-sans text-lg md:text-xl max-w-2xl opacity-90 whitespace-pre-wrap">
          {COPY.modules["01"].body}
        </div>
      </div>
    ),
    stressTest: {
      title: COPY.modules["01"].noteTitle,
      content: COPY.modules["01"].noteLines
    }
  },
  {
    id: ModuleType.RECRUITS,
    index: "02",
    title: COPY.modules["02"].title,
    promptText: COPY.modules["02"].prompt,
    themeColor: 'cream',
    responseText: COPY.modules["02"].oneLine,
    responseDisplay: (
      <div className="space-y-8">
        <div className="font-serif text-xl md:text-2xl leading-relaxed opacity-90 whitespace-pre-wrap mb-6">
            {COPY.modules["02"].lead}
        </div>
        <ul className="space-y-6">
          {COPY.modules["02"].people.map((p, i) => (
             <li key={i}>
                <strong className="font-serif text-lg md:text-xl block mb-1">{p.name}</strong>
                <p className="font-sans text-base md:text-lg opacity-80 leading-relaxed whitespace-pre-wrap">{p.body}</p>
             </li>
          ))}
        </ul>
        <p className="font-mono text-sm opacity-60 mt-4 whitespace-pre-wrap border-t border-black/10 pt-4">
          {COPY.modules["02"].together}
        </p>
      </div>
    ),
  },
  {
    id: ModuleType.MODEL,
    index: "03",
    title: COPY.modules["03"].title,
    promptText: COPY.modules["03"].prompt,
    themeColor: 'black',
    responseText: COPY.modules["03"].hero,
    responseDisplay: (
      <div className="space-y-8">
        <div>
           <div className="font-serif text-2xl md:text-4xl leading-relaxed mb-4">
             {COPY.modules["03"].hero}
           </div>
           <p className="font-sans text-lg md:text-xl opacity-90 leading-relaxed whitespace-pre-wrap">
             {COPY.modules["03"].body}
           </p>
        </div>

        <div className="space-y-2">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-60">{COPY.modules["03"].bulletsTitle}</h4>
           <ul className="list-disc pl-4 space-y-1 font-sans opacity-90">
             {COPY.modules["03"].bullets.map((b, i) => <li key={i}>{b}</li>)}
           </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/20">
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">{COPY.modules["03"].grid.leftTitle}:</h4>
              <p className="font-sans font-bold">{COPY.modules["03"].grid.leftBody}</p>
           </div>
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">{COPY.modules["03"].grid.rightTitle}:</h4>
              <p className="font-sans font-bold">{COPY.modules["03"].grid.rightBody}</p>
           </div>
        </div>
        <p className="font-serif italic opacity-70 border-t border-white/10 pt-4 mt-4">{COPY.modules["03"].close}</p>
      </div>
    ),
  },
  {
    id: ModuleType.COMPANIES,
    index: "04",
    title: COPY.modules["04"].title,
    promptText: COPY.modules["04"].prompt,
    themeColor: 'clay',
    responseText: COPY.modules["04"].hero,
    responseDisplay: (
      <div className="space-y-8">
        <p className="font-serif text-xl md:text-3xl leading-relaxed">
          {COPY.modules["04"].hero}
        </p>
        <div className="font-sans text-lg opacity-80 whitespace-pre-wrap">
           {COPY.modules["04"].body}
        </div>

        <div className="bg-black/5 p-6 border border-black/10">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">{COPY.modules["04"].wedgesTitle}</h4>
           <ul className="space-y-2 font-mono text-sm list-disc pl-4">
             {/* Note: Original copy used numbers 01,02,03 in text, but array is Strings in new copy. */}
             {COPY.modules["04"].wedges.map((w,i) => <li key={i}>{w}</li>)}
           </ul>
        </div>

        <div>
             <h4 className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">{COPY.modules["04"].first30Title}</h4>
             <p className="font-sans opacity-90 whitespace-pre-wrap">{COPY.modules["04"].first30}</p>
        </div>
      </div>
    ),
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