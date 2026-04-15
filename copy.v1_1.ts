/* copy.v1_1.ts
   CT Dossier copy — recruiter-facing, systems-led, deterministic.
   Source: portfolio strategy, brand brief, and current app IA. */

export const CT_DOSSIER_COPY_V120 = {
  meta: {
    version: "1.2.0",
    voice: "personal-technical",
    rule: "first-person, no hype, no mysticism",
  },

  modules: {
    "01": {
      title: "CREATIVE TECHNOLOGIST",
      prompt: "PRACTICE THESIS",
      hero:
        "I design systems that make complex technical work legible.",
      body:
        [
          "My work sits between engineering truth and operator confidence.",
          "I build visual operating languages, interactive prototypes, and technical narratives for products that have to be understood before they can be trusted.",
          "The through-line is consistent: turn difficult systems into clear interfaces, proof artifacts, and stories that hold up under pressure."
        ].join("\n\n"),
      noteTitle: "NOTE",
      noteLines: [
        "[!] Multidisciplinary by default.",
        "[!] Interface, narrative, and system logic stay connected.",
        "[!] If it cannot be explained clearly, it is not ready.",
      ],
    },

    "02": {
      title: "ROLE FIT",
      prompt:
        "WHAT I DO BEST",
      lead:
        [
          "I am strongest in roles that sit between concept, product, and technical communication.",
          "The value is not one medium. The value is making the whole system readable."
        ].join("\n"),
      people: [
        {
          name: "Visual Operating Languages",
          body:
            [
              "I build coherent visual systems for products that need to feel credible, disciplined, and operational rather than speculative.",
              "That includes interface grammar, typography, hierarchy, diagrams, and documentation patterns that can scale across screens, decks, and artifacts."
            ].join("\n\n"),
          tags: ["design systems", "brand systems", "interface grammar"],
          prevents: "Work that looks polished but does not cohere."
        },
        {
          name: "Interactive Prototypes",
          body:
            [
              "I do not stop at static comps when the idea needs behavior to be believed.",
              "I build high-fidelity prototypes in React, Vite, WebGL-adjacent front-end stacks, and motion systems so teams can evaluate flow, not just appearance."
            ].join("\n\n"),
          tags: ["rapid prototyping", "front-end", "interaction architecture"],
          prevents: "Concepts that sound strong but cannot survive contact with use."
        },
        {
          name: "Technical Storytelling",
          body:
            [
              "I translate dense engineering, autonomy, geospatial, and mission-oriented ideas into recruiter-ready, stakeholder-ready, and operator-legible artifacts.",
              "The goal is not spectacle. It is clarity, trust, and a stronger decision surface."
            ].join("\n\n"),
          tags: ["visual storytelling", "systems explanation", "product narrative"],
          prevents: "Important work that stays trapped inside engineering context."
        },
      ],
      together:
        [
          "Together these form the core hiring signal:",
          "1) coherent systems thinking,",
          "2) working prototypes,",
          "3) clear communication for technical audiences."
        ].join("\n"),
      oneLine:
        "I bridge system logic, interface behavior, and technical narrative in one practice.",
    },

    "03": {
      title: "OPERATING METHOD",
      prompt: "HOW I WORK",
      hero: "I move from concept to proof quickly, but I still need the work to hold together.",
      body:
        [
          "I work well on teams that need someone to define the visual language, prototype the interaction, and tighten the story around why the product matters.",
          "My default move is to find the governing structure first: what the operator needs to know, what the stakeholder needs to believe, and what the system needs to show.",
          "From there I turn ambiguity into artifacts: interface studies, motion tests, mockups, diagrams, deck systems, or live prototypes."
        ].join("\n\n"),
      bulletsTitle: "DEFAULT BIAS",
      bullets: [
        "Treat complex products as communication systems, not just feature sets.",
        "Use prototypes to test credibility and flow before polish becomes expensive.",
        "Make design serve trust, legibility, and decision quality under constraint.",
      ],
      grid: {
        leftTitle: "PRIMARY TENSION",
        leftBody: "I can sprint ahead of formalization when the concept is still unfolding.",
        rightTitle: "COUNTER-BALANCE",
        rightBody: "Codify the grammar once the signal is real so the system stays reusable.",
      },
      close:
        "The short version: I am most useful where design, product sense, and technical articulation need to meet in one person.",
    },

    "04": {
      title: "SELECTED SYSTEMS",
      prompt: "WHERE THE WORK SHOWS UP",
      hero: "The portfolio is a set of proof artifacts, not a gallery of disconnected images.",
      body:
        [
          "Each project is doing a different job: visual governance, live workstation design, tactical interface prototyping, autonomy simulation, or technical evidence translation.",
          "The common thread is the same one described in the docs: make consequential systems legible without collapsing into generic 'defense sci-fi' or generic SaaS polish."
        ].join("\n\n"),
      wedgesTitle: "FOUR PILLARS",
      wedges: [
        "Tactical OS: visual governance, component grammar, and interface rules for high-assurance environments.",
        "Spatial Intelligence: terrain, sensor, and geospatial products that make evidence readable across surfaces.",
        "Autonomous Command: swarm, simulation, and operational prototypes that show system behavior under load.",
        "High-Assurance Safety: human-factors, bias mitigation, and trust-building interfaces for consequential decisions.",
      ],
      first30Title: "WHAT EACH PROJECT PROVES",
      first30:
        [
          "DEADLIGHT: I can codify a visual operating language instead of styling page by page.",
          "GREY-EARTH: I can ship a live workstation that joins terrain analysis, interface design, and real technical constraints.",
          "TACTICAL CANVAS: I can prototype a mission workflow so the operator understands what happens next.",
          "WAR-F / MINI-D / SENTINEL: I can turn dense autonomy or sensing concepts into clear evaluation artifacts."
        ].join("\n"),
      companiesTitle: "SELECTED CASEWORK",
      companies: [
        {
           name: "DEADLIGHT",
           tagline: "Visual governance for high-assurance systems",
           why: "A deterministic brand and interface language for mission-critical software and technical storytelling.",
           match: "Design system + strategic narrative"
        },
        {
           name: "DOSSIER VOL",
           tagline: "Component grammar for intelligence-style products",
           why: "A visual operating specification that turns geospatial and intelligence interfaces into a coherent system.",
           match: "Interface grammar + documentation"
        },
        {
           name: "GREY-EARTH",
           tagline: "Live tactical terrain workstation",
           why: "A production-minded terrain analysis surface with real interaction logic, map workflows, and operator-facing clarity.",
           match: "Product design + front-end implementation"
        },
        {
           name: "TACTICAL CANVAS",
           tagline: "Mission workflow prototype",
           why: "An interface study focused on visible task flow, command confidence, and stronger mission-state communication.",
           match: "Rapid prototyping + systems UI"
        },
        {
           name: "WAR-F",
           tagline: "Swarm operations layer",
           why: "A digital-twin style framework that connects engineering truth, simulation behavior, and sustainment artifacts.",
           match: "Operational storytelling + systems translation"
        },
        {
           name: "SENTINEL / MINI-D",
           tagline: "Verification and sensor credibility",
           why: "Projects that make autonomy claims, sensor behavior, and evaluation conditions legible enough to inspect.",
           match: "Evidence artifacts + technical communication"
        }
      ],
      companiesSynthesis: "Taken together, the work signals a specific profile: a creative technologist who can define the visual language, prototype the product behavior, and articulate the system clearly enough for design, product, engineering, recruiting, and stakeholder review."
    },
  },
};
