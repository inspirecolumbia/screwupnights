"use client";

import { useEffect, useRef } from "react";

type Link = { href: string; label: string };

// Mobile menu. A native <details> so it still opens without JavaScript; the
// script only adds closing on link tap, Escape and a tap outside.
export default function Menu({ links, cta }: { links: Link[]; cta: Link }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const close = (focusSummary: boolean) => {
    const el = ref.current;
    if (!el?.open) return;
    el.open = false;
    if (focusSummary) el.querySelector("summary")?.focus();
  };

  return (
    <details
      className="menu"
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Escape") close(true);
      }}
    >
      <summary aria-label="Menu">
        <span className="burger" aria-hidden="true" />
      </summary>
      <ul
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close(false);
        }}
      >
        {links.map((n) => (
          <li key={n.href}>
            <a href={n.href}>{n.label}</a>
          </li>
        ))}
        <li>
          <a className="menu-cta" href={cta.href}>
            {cta.label}
          </a>
        </li>
      </ul>
    </details>
  );
}
