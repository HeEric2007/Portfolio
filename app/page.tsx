import type { ReactNode } from "react";
import { site } from "@/content/site";

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderText(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    parts.push(
      <a
        key={key++}
        href={match[2]}
        className="underline decoration-1 decoration-muted underline-offset-2 transition-colors hover:decoration-fg"
      >
        {match[1]}
      </a>
    );
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts;
}

export default function HomePage() {
  return (
    <div className="pt-8 md:pt-16">
      <h1 className="text-3xl font-bold lowercase">{site.name}</h1>
      <p className="mt-2 text-muted">{site.tagline}</p>
      <div className="mt-10 max-w-[60ch] space-y-4 leading-relaxed">
        {site.intro.map((paragraph) => (
          <p key={paragraph}>{renderText(paragraph)}</p>
        ))}
      </div>
    </div>
  );
}
