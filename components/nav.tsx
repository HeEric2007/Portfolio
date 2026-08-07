"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const pages = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/photos", label: "photos" },
];

const external = [
  { href: site.github, label: "github", newTab: true },
  { href: site.linkedin, label: "linkedin", newTab: true },
  { href: `mailto:${site.email}`, label: "email", newTab: false },
];

export function Nav() {
  const pathname = usePathname();

  const items = [
    ...pages.map((page) => ({
      ...page,
      active: page.href === "/" ? pathname === "/" : pathname.startsWith(page.href),
      external: false as const,
      newTab: false,
    })),
    ...external.map((link) => ({ ...link, active: false, external: true as const })),
  ];

  return (
    <nav className="flex justify-center">
      <ul className="scrollbar-hide flex items-center gap-x-1 overflow-x-auto whitespace-nowrap px-6 py-8 text-center sm:flex-wrap sm:justify-center sm:gap-y-2 sm:overflow-visible sm:whitespace-normal">
        {items.map((item, i) => (
          <li key={item.href} className="flex shrink-0 items-center">
            {i > 0 && <span className="mx-2 text-muted select-none">·</span>}
            {item.external ? (
              <a
                href={item.href}
                {...(item.newTab
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className={
                  item.active
                    ? "text-fg"
                    : "text-muted transition-colors hover:text-fg"
                }
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
