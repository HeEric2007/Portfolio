export type Experience = {
  role: string;
  org: string;
  /** Path under /public to a square logo, e.g. "/logos/foo.png". Omit if you don't have one. */
  logo?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or omit for "present" */
  end?: string;
  bullets: string[];
};

// Add a role here — order doesn't matter, the page sorts by start date descending.
export const experience: Experience[] = [
  {
    role: "software development intern",
    org: "billion dollar startup ideas",
    logo: "/logos/bdsi.png",
    start: "2024-06",
    end: "2024-08",
    bullets: [
      "dialogue system for a spanish-learning game in unity (c#, 2d). json-driven branching dialogue with a textmeshpro dialogue box, typewriter text, and player response choices, triggered by walking up to npcs. part of the intern team's mvp demo.",
      "owned the dialogue system end to end. learned to keep content in data rather than code, so writers could add dialogue without touching scripts.",
    ],
  },
];
