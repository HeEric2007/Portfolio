import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "projects",
  description: "things I've built.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="pt-8 md:pt-16">
      <h1 className="text-3xl font-bold">projects</h1>
      <div className="mt-10 space-y-4">
        {sorted.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
