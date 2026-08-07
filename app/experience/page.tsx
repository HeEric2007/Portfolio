import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { ExperienceCard } from "@/components/experience-card";

export const metadata: Metadata = {
  title: "experience",
  description: "where I've worked.",
};

export default function ExperiencePage() {
  const sorted = [...experience].sort((a, b) =>
    b.start.localeCompare(a.start),
  );

  return (
    <div className="pt-8 md:pt-16">
      <h1 className="text-3xl font-bold">experience</h1>
      <div className="mt-10 space-y-4">
        {sorted.map((role) => (
          <ExperienceCard key={`${role.org}-${role.start}`} experience={role} />
        ))}
      </div>
    </div>
  );
}
