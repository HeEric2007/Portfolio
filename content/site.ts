export type SiteConfig = {
  name: string;
  tagline: string;
  intro: string[];
  url: string;
  github: string;
  linkedin: string;
  email: string;
};

const email = "heeric2007@gmail.com";

export const site: SiteConfig = {
  name: "eric he",
  tagline: "figuring it out",
  intro: [
    "hey i'm eric! i build software, ideally the kind someone actually ends up using.",
    "outside of that i'm usually working on a car, driving somewhere with no particular destination, or getting work in at the boxing gym. i also like to collect pokemon cards and take photos. i've been top 500 valorant on the ranked leaderboard, once. which is exactly as useful as it sounds.",
    "lately it's been lifting, almost six months in now, slowly getting less bad at it.",
    `i'm always open to connecting though, whether you're a recruiter with something interesting, or someone just looking to make a new friend :).`,
    `reach out by email at [${email}](mailto:${email}).`
  ],
  url: "https://example.com",
  github: "https://github.com/HeEric2007",
  linkedin: "https://www.linkedin.com/in/ericheumn/",
  email,
};
