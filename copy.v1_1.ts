/* copy.v1_1.ts
   Founder Dossier Copy v1.1 — personal + technical, deterministic.
   Source: truth notes + README IA. */

export const FOUNDER_COPY_V110 = {
  meta: {
    version: "1.1.0",
    voice: "personal-technical",
    rule: "first-person, no hype, no mysticism",
  },

  modules: {
    "01": {
      title: "FOUNDER",
      prompt: "CORE THESIS",
      hero:
        "I build systems that keep working when reality is messy.",
      body:
        [
          "I’m interested in control stacks: sensing → interpretation → decision → action → proof.",
          "Most projects fail because one layer breaks: the system doesn’t cohere, the humans don’t align, or nothing ships.",
          "My default move is to pick one environment, close one loop, then harden it until it can be trusted."
        ].join("\n\n"),
      noteTitle: "NOTE",
      noteLines: [
        "[!] Deterministic output. No vibes.",
        "[!] Interpretation is rules-based.",
        "[!] If it can’t be tested, it’s not finished.",
      ],
    },

    "02": {
      title: "THE RECRUITMENT TRIAD",
      prompt:
        "SPC PROMPT — Who are three people you would recruit regardless of what you do? What makes them special?",
      lead:
        [
          "When I’m building something new, I don’t start with features.",
          "I start with failure modes — and I recruit for the control layer underneath them."
        ].join("\n"),
      people: [
        {
          name: "Michael Levin (Tufts) — the Morphology Programmer",
          body:
            [
              "He treats biology like an information system with memory and goals, not just chemistry plus DNA.",
              "What I steal from him is the idea that coherence can be engineered: parts can self-organize into wholes — and recover after damage.",
              "That’s foundational for building adaptive systems that don’t collapse the first time conditions change."
            ].join("\n\n"),
          tags: ["coherence", "self-organization", "repair", "control layers"],
          prevents: "Systems that won’t cohere."
        },
        {
          name: "Chase Hughes — the Human Interface Hacker",
          body:
            [
              "He operationalizes human behavior under uncertainty: trust, resistance, incentives, attention.",
              "What I steal from him is turning social chaos into signal — so systems can be adopted and followed in real situations, not just demos.",
              "Great tech fails when humans don’t align. He’s the antidote."
            ].join("\n\n"),
          tags: ["alignment", "negotiation", "protocols", "real-time outcomes"],
          prevents: "Humans that won’t align."
        },
        {
          name: "Kelly Johnson (Skunk Works) — the Speed + Truth Engineer",
          body:
            [
              "He shipped impossible machines fast by treating simplicity and constraints like tools, not enemies.",
              "What I steal from him is the organizational physics: small teams, direct comms, tight feedback loops, test early, ship.",
              "Tempo is a competitive advantage because it buys truth sooner."
            ].join("\n\n"),
          tags: ["tempo", "constraints", "execution", "feedback loops"],
          prevents: "Projects that won’t ship."
        },
      ],
      together:
        [
          "Together they cover the three universal failure modes:",
          "1) The system won’t cohere (Levin).",
          "2) The humans won’t align (Hughes).",
          "3) The thing won’t ship (Johnson)."
        ].join("\n"),
      oneLine:
        "Coherence → Alignment → Shipping. That’s the stack I try to build in every environment.",
    },

    "03": {
      title: "FOUNDER MODEL",
      prompt: "FOUNDER TYPE — RESULT",
      hero: "I'm what you'd call a Skunkworks Systems Founder.",
      body:
        [
          "I don't see products. I see systems that have to keep working when things go wrong.",
          "When I recruit, I'm looking for leverage—people who change trajectories, not people who add capacity. The three I'd pick: Michael Levin (makes parts become coherent wholes), Chase Hughes (turns human chaos into signal), Kelly Johnson (ships impossible things fast). Together they solve the three ways projects die: systems fall apart, people don't align, nothing ships.",
          "I care about control layers. How things self-organize. How decisions get made. How execution actually happens. Not tactics.",
          "What this looks like: I start with frameworks. I build prototypes to test them. I'm good at naming things and building narrative. I hate busywork and design-by-committee."
        ].join("\n\n"),
      bulletsTitle: "MY DEFAULT OPERATING BIAS",
      bullets: [
        "Systems are control problems (feedback loops, incentives, constraints).",
        "Reality is layered (a stack of interacting subsystems).",
        "Execution is a design material, not a project-management chore.",
      ],
      grid: {
        leftTitle: "PRIMARY TENSION",
        leftBody: "I can outrun cleanup (tempo beats hygiene if I'm not careful).",
        rightTitle: "COUNTER-BALANCE",
        rightBody: "Scheduled refactor sprints enforced as policy.",
      },
      close:
        "The short version: I build operating systems for outcomes, not single-feature apps.",
    },

    "04": {
      title: "COMPANY I’D BUILD",
      prompt: "WHAT WOULD YOU BUILD NEXT?",
      hero: "A control-stack company for messy reality.",
      body:
        [
          "A company that sits between chaotic environments and clean decisions.",
          "Sensors, workflows, and audit-grade logs that turn: incident → signal → decision → action → proof.",
          "I care more about coherence under pressure than glossy intelligence."
        ].join("\n\n"),
      wedgesTitle: "FIRST WEDGES I’D BET ON",
      wedges: [
        "Field ops intelligence: one environment, one loop, one metric.",
        "Audit-grade agent infrastructure: permissions, provenance, test harnesses, accountability.",
        "Human-system interface: tools where trust and adoption are part of the UI.",
      ],
      first30Title: "FIRST 30 DAYS TEST",
      first30:
        [
          "Week 1–2: build a brutal prototype that closes one loop end-to-end.",
          "Week 3: run it with one real operator in the wild.",
          "Week 4: tighten: every alert leads to a decision, every decision is logged, every outcome feeds the next iteration."
        ].join("\n"),
    },
  },
};
