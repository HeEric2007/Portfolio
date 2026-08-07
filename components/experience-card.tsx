import type { Experience } from "@/content/experience";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function formatDate(date: string) {
  const [year, month] = date.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="rounded border border-border p-6">
      <div className="flex gap-4">
        {experience.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={experience.logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-bold">
              {experience.role} · {experience.org}
            </h3>
            <span className="text-sm whitespace-nowrap text-muted">
              {formatDate(experience.start)} –{" "}
              {experience.end ? formatDate(experience.end) : "present"}
            </span>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {experience.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
