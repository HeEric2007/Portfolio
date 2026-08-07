import type { Project } from "@/content/projects";
import { Pill } from "@/components/pill";

const cardClass =
  "block rounded border border-border p-6 transition-colors hover:border-fg";

export function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <h3 className="font-bold">{project.name}</h3>
      <p className="mt-2 text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {inner}
      </a>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}
