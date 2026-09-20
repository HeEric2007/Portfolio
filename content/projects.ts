export type Project = {
  /** Unique, url-safe. Used as the React key. */
  slug: string;
  name: string;
  /** 1-2 sentences. Shown on the card, no markdown. */
  description: string;
  tags: string[];
  /** If set, the whole card links here (opens in a new tab). Omit for unlaunched/private work. */
  url?: string;
  year: number;
};

// Add a project by adding an entry here — order doesn't matter, the page
// sorts by year descending.
export const projects: Project[] = [
  {
    slug: "gopherfy",
    name: "gopherfy",
    description:
      "Discord bot: email OTP proves @umn.edu ownership, remembers the user, and auto-assigns verified when they join any server running Gopherfy.",
    tags: ["JavaScript", "Discord", "SQLite"],
    url: "https://github.com/ravindu-ranasinghe/Gopherfy",
    year: 2026,
  },
  {
    slug: "dishpute",
    name: "dishpute",
    description:
      "O1 Summit hackathon finalist project: an agentic dispute assistant that helps restaurants fight missing-item chargebacks on delivery platforms.",
    tags: ["TypeScript", "Full Stack"],
    url: "https://github.com/Ritpra93/Dishpute",
    year: 2026,
  },
];
