import React from 'react';
import { ModuleData, ModuleType } from './types';
import { CT_DOSSIER_COPY_V120 as COPY } from './copy.v1_1';
import { CollapsibleDrawer } from './components/CollapsibleDrawer';
import { AnimatedGrid } from './components/AnimatedGrid';

export const COLORS = {
  blue: 'bg-strata-blue text-white border-white/20 theme-blue',
  cream: 'bg-strata-cream text-strata-black border-strata-black/20',
  black: 'bg-strata-black text-white border-white/20 theme-dark',
  clay: 'bg-strata-clay text-white border-white/20 theme-brown',
};

export const RECRUIT_CARDS = [
  {
    name: "Visual Systems",
    role: "Design Language",
    capability: "Builds coherence across interface, brand, and documentation.",
    signal: "Strong design-system thinking for technical products.",
    desc: "Turns scattered artifacts into one readable operating language instead of a collection of disconnected deliverables."
  },
  {
    name: "Interactive Prototypes",
    role: "Product Proof",
    capability: "Makes product concepts believable through working behavior.",
    signal: "Can move from concept frame to functional prototype quickly.",
    desc: "Uses front-end implementation and interaction studies to test flow, hierarchy, and trust before the team commits too much polish."
  },
  {
    name: "Technical Narratives",
    role: "Systems Translation",
    capability: "Explains dense systems without flattening their complexity.",
    signal: "Useful where engineering, product, and recruiting all need the same story.",
    desc: "Translates autonomy, geospatial, sensing, and mission-software concepts into artifacts people can evaluate and remember."
  }
];

const SELECTED_SYSTEMS_EVIDENCE = [
  {
    title: "GREY-EARTH / Live Deployment",
    description: "Deployed tactical terrain workstation showing real product execution, not just concept framing.",
    link: "https://grey-earth.vercel.app",
    linkLabel: "Open Live System"
  },
  {
    title: "GREY-EARTH / Source",
    description: "Next.js terrain workstation repo with manifest-first rendering, 2D/3D map logic, and Earth Engine integration.",
    link: "https://github.com/augustave/GREY-EARTH",
    linkLabel: "Open GitHub Repo"
  },
  {
    title: "DEADLIGHT / Source",
    description: "Public brand-system repo representing the visual governance layer behind the portfolio.",
    link: "https://github.com/augustave/deadlight",
    linkLabel: "Open GitHub Repo"
  },
  {
    title: "TACTICAL CANVAS / Source",
    description: "Mission-thread interface prototype focused on tactical workflow clarity and systems UI.",
    link: "https://github.com/augustave/TACTICAL-CANVAS",
    linkLabel: "Open GitHub Repo"
  },
  {
    title: "MINI-D / Source",
    description: "Autonomy-lab proof artifact oriented around evaluation, limits, and inspectable behavior.",
    link: "https://github.com/augustave/MINI-D",
    linkLabel: "Open GitHub Repo"
  },
  {
    title: "CCRT / Source",
    description: "Human-factors and high-assurance interface direction for warfighter-centered command environments.",
    link: "https://github.com/augustave/CCRT",
    linkLabel: "Open GitHub Repo"
  }
];

/**
 * Content modules for the CT Dossier.
 * Display indices intentionally differ from copy keys to preserve the current shell.
 */
export const CONTENT_MODULES: ModuleData[] = [
  {
    id: ModuleType.MANIFEST,
    index: "00",
    title: "MANIFEST",
    promptText: "NAVIGATION INDEX",
    themeColor: 'cream',
    responseText: "Select a stratum to jump to its coordinates.",
    responseDisplay: "Select a stratum to jump to its coordinates.",
  },
  {
    id: ModuleType.THESIS,
    index: "02",
    title: COPY.modules["01"].title,
    promptText: COPY.modules["01"].prompt,
    themeColor: 'blue',
    responseText: COPY.modules["01"].hero,
    responseDisplay: (
      <div className="space-y-8">
        <div className="font-mono text-sm leading-relaxed opacity-tertiary border-l-2 border-white/30 pl-4">
          FILE: {COPY.meta.version}<br/>
          MODE: {COPY.modules["01"].noteLines[0]} / {COPY.modules["01"].noteLines[1]}<br/>
          NO API. NO PORTFOLIO THEATER.
        </div>
        <div className="font-serif text-2xl md:text-4xl leading-relaxed">
          {COPY.modules["01"].hero}
        </div>
        <div className="font-sans text-lg md:text-xl max-w-2xl opacity-secondary leading-relaxed">
          {COPY.modules["01"].body.split('\n\n').map((para, i) => (
            <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
          ))}
        </div>
      </div>
    )
  },
  {
    id: ModuleType.RECRUITS,
    index: "01",
    title: COPY.modules["02"].title,
    promptText: COPY.modules["02"].prompt,
    themeColor: 'cream',
    responseText: COPY.modules["02"].oneLine,
    responseDisplay: (
      <div className="space-y-8">
        <div className="font-serif text-2xl md:text-4xl leading-relaxed opacity-secondary mb-6">
            {COPY.modules["02"].lead.split('\n').map((line, i) => (
              <span key={i}>{line}{i < 1 && <br/>}</span>
            ))}
        </div>
        <ul className="space-y-6">
          {COPY.modules["02"].people.map((p, i) => (
             <li key={i}>
                <strong className="font-serif text-xl md:text-2xl block mb-2">{p.name}</strong>
                <div className="font-sans text-base md:text-lg opacity-secondary leading-relaxed">
                  {p.body.split('\n\n').map((para, j) => (
                    <p key={j} className={j > 0 ? 'mt-3' : ''}>{para}</p>
                  ))}
                </div>
             </li>
          ))}
        </ul>
        <p className="font-mono text-sm opacity-muted mt-4 border-t border-black/10 pt-4 leading-relaxed">
          {COPY.modules["02"].together.split('\n').map((line, i) => (
            <span key={i}>{line}{i < COPY.modules["02"].together.split('\n').length - 1 && <br/>}</span>
          ))}
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
           <div className="font-sans text-lg md:text-xl opacity-secondary leading-relaxed">
             {COPY.modules["03"].body.split('\n\n').map((para, i) => (
               <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
             ))}
           </div>
        </div>

        <div className="space-y-3">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-muted">{COPY.modules["03"].bulletsTitle}</h4>
           <ul className="space-y-2">
             {COPY.modules["03"].bullets.map((b, i) => (
               <li key={i} className="flex gap-3 items-start">
                 <span className="font-mono text-xs opacity-muted pt-1">&bull;</span>
                 <span className="font-sans text-base md:text-lg opacity-secondary leading-relaxed">{b}</span>
               </li>
             ))}
           </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/20">
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-muted mb-2">{COPY.modules["03"].grid.leftTitle}:</h4>
              <p className="font-sans text-base md:text-lg font-bold">{COPY.modules["03"].grid.leftBody}</p>
           </div>
           <div>
              <h4 className="font-mono text-xs uppercase tracking-widest opacity-muted mb-2">{COPY.modules["03"].grid.rightTitle}:</h4>
              <p className="font-sans text-base md:text-lg font-bold">{COPY.modules["03"].grid.rightBody}</p>
           </div>
        </div>
        <p className="font-serif text-lg md:text-xl italic opacity-tertiary border-t border-white/10 pt-4 mt-4">{COPY.modules["03"].close}</p>
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
    evidence: SELECTED_SYSTEMS_EVIDENCE,
    responseDisplay: (
      <div className="space-y-8">
        <p className="font-serif text-2xl md:text-4xl leading-relaxed">
          {COPY.modules["04"].hero}
        </p>
        <div className="font-sans text-lg md:text-xl opacity-secondary leading-relaxed">
           {COPY.modules["04"].body.split('\n\n').map((para, i) => (
             <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
           ))}
        </div>

        <div className="bg-black/5 p-6 border border-black/10">
           <h4 className="font-mono text-xs uppercase tracking-widest opacity-muted mb-4">{COPY.modules["04"].wedgesTitle}</h4>
           <ul className="space-y-3">
             {COPY.modules["04"].wedges.map((w, i) => (
               <li key={i} className="flex gap-3 items-start">
                 <span className="font-mono text-xs opacity-muted pt-0.5">0{i + 1}</span>
                 <span className="font-sans text-base md:text-lg opacity-secondary leading-relaxed">{w}</span>
               </li>
             ))}
           </ul>
        </div>

        <div>
             <h4 className="font-mono text-xs uppercase tracking-widest opacity-muted mb-4">{COPY.modules["04"].first30Title}</h4>
             <div className="space-y-4">
               {COPY.modules["04"].first30.split('\n').map((line, i) => {
                 const colonIndex = line.indexOf(':');
                 const label = line.substring(0, colonIndex);
                 const content = line.substring(colonIndex + 1).trim();
                 return (
                   <div key={i} className="flex gap-4 items-start">
                     <span className="font-mono text-xs uppercase tracking-wider opacity-muted whitespace-nowrap pt-1">
                       {label}:
                     </span>
                     <span className="font-sans text-base md:text-lg opacity-secondary leading-relaxed">
                       {content}
                     </span>
                   </div>
                 );
               })}
             </div>
        </div>

        <div className="mt-8">
             <CollapsibleDrawer title={COPY.modules["04"].companiesTitle} defaultOpen={true}>
                 <AnimatedGrid>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                       {COPY.modules["04"].companies.map((c, idx) => (
                     <div key={idx} className="p-6 border border-current opacity-secondary hover:opacity-primary transition-opacity">
                        <h4 className="font-serif text-xl md:text-2xl mb-2 italic">{c.name}</h4>
                        <div className="font-mono text-xs uppercase tracking-widest mb-4 opacity-tertiary">{c.tagline}</div>
                        <p className="font-sans text-sm opacity-secondary leading-relaxed mb-4">{c.why}</p>
                        <p className="font-mono text-xs uppercase tracking-wide opacity-muted mb-3">
                          PROVES: {c.proof}
                        </p>
                        <p className="font-sans text-sm opacity-secondary leading-relaxed mb-4">
                          {c.artifact}
                        </p>
                        <div className="pt-4 border-t border-current/20 flex items-center gap-2">
                           <span className="font-mono text-micro uppercase opacity-tertiary">{c.match}</span>
                        </div>
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-4 font-mono text-xs uppercase tracking-widest border border-current px-3 py-2 hover:bg-black hover:text-white transition-colors"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Review Artifact
                        </a>
                     </div>
                   ))}
                 </div>
                 <div className="mt-6 p-6 border-t border-current/20">
                    <p className="font-sans text-base md:text-lg opacity-secondary leading-relaxed">
                       {COPY.modules["04"].companiesSynthesis}
                    </p>
                 </div>
                 </AnimatedGrid>
             </CollapsibleDrawer>
        </div>
      </div>
    ),
  },
  {
    id: ModuleType.SIMULATOR,
    index: "05",
    title: "ROLE MATRIX",
    promptText: "INTERACTIVE FIT LENS",
    themeColor: 'blue',
    responseText: "Map the kind of work and environment against the role I am most likely to play well.",
    responseDisplay: "Map the kind of work and environment against the role I am most likely to play well.",
  }
];

export const INQUIRY_OPTIONS = {
  assess: [
    "Role Fit",
    "Systems Thinking",
    "Prototype Process",
    "Visual Design Range",
    "Mission / Domain Context"
  ],
  challenge: [
    "Project Scope",
    "Technical Fluency",
    "Collaboration Style",
    "Hiring Need",
    "Portfolio Walkthrough"
  ]
};

export const INQUIRY_QUESTIONS: Record<string, string[]> = {
  "Role Fit": [
    "What kinds of roles are you targeting most directly right now?",
    "Where do you create the most leverage: product concepting, interface systems, or technical storytelling?",
    "What sort of team would use your range best instead of flattening it into one lane?",
    "What is the strongest signal recruiters should take from this dossier?"
  ],
  "Systems Thinking": [
    "How do you move from a complex system to a legible interface without oversimplifying it?",
    "What constraints usually shape your design decisions first: operator cognition, technical reality, or stakeholder communication?",
    "How do you decide what must stay visible versus what can remain implicit?",
    "What makes a system feel trustworthy to you?"
  ],
  "Prototype Process": [
    "When do you stay in static design versus move into a working prototype?",
    "What do you prototype first: flow, hierarchy, motion, or proof of technical credibility?",
    "How do you use front-end implementation to de-risk product ideas?",
    "What makes a prototype successful for you?"
  ],
  "Visual Design Range": [
    "How do you keep a strong point of view without making every project look the same?",
    "What parts of the visual system are fixed and what parts shift per domain?",
    "How do brand, interface, and motion stay coherent in your work?",
    "Where do you deliberately reject generic tech aesthetics?"
  ],
  "Mission / Domain Context": [
    "Why do defense, autonomy, geospatial, or high-assurance systems hold your attention?",
    "How do you avoid turning consequential domains into empty spectacle?",
    "What have these mission-oriented projects taught you about trust and legibility?",
    "How do you adapt your output for procurement, stakeholders, and operators at the same time?"
  ],
  "Project Scope": [
    "What do you own end to end on a typical project, and where do you want deeper collaboration?",
    "Which parts of the workflow do you prefer to keep in-house rather than hand off early?",
    "What project shapes are the best fit for your skill mix?"
  ],
  "Technical Fluency": [
    "How deep into implementation do you usually go when building prototypes?",
    "What tools or stacks are central to the way you work today?",
    "How do you collaborate with engineering without losing the quality of the concept?"
  ],
  "Collaboration Style": [
    "How do you work with product, engineering, and marketing when the brief is still ambiguous?",
    "What kind of feedback helps you sharpen the work fastest?",
    "What conditions produce your best work on a team?"
  ],
  "Hiring Need": [
    "What kind of team problem are you best suited to solve in the first 90 days?",
    "Where can you accelerate a team immediately without a long onboarding runway?",
    "What signals tell you a role is actually designed for someone with your range?"
  ],
  "Portfolio Walkthrough": [
    "Which two projects should someone review first to understand the full range?",
    "How do the projects connect instead of reading like separate experiments?",
    "If you had 10 minutes with a recruiter, which artifacts would you walk them through and why?"
  ]
};
