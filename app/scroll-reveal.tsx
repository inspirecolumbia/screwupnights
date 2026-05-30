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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
