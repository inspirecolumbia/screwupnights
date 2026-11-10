"use client";

import { useEffect } from "react";

/**
 * Adds the `.in` class to every `.rv` element as it scrolls into view, mirroring
 * the prototype's IntersectionObserver-driven reveal. Renders nothing — it just
 * wires up the observer against the server-rendered markup after hydration.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    // Without IntersectionObserver, reveal everything so content is never stuck hidden.
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Stagger only the elements that enter together, 100ms apart, capped
        // at 300ms so a fast scroll never leaves content waiting.
        let n = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${Math.min(n++, 3) * 100}ms`;
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
