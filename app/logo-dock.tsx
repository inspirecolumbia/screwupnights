"use client";

import { useEffect } from "react";

/**
 * Scroll-linked: the hero logo shrinks and glides into the nav's logo slot as
 * the page scrolls, then hands over to the real nav logo.
 *
 * A fixed-position copy does the flying. Its position depends only on scroll
 * progress, never on the page moving underneath it, so it can't stutter while
 * the browser scrolls; the real hero logo just holds its place in the layout.
 * The copy ignores clicks, so the nav logo link underneath always works.
 *
 * CSS hides the nav logo only while this can run (scripting on, motion
 * allowed); `logo-docked` on <html> brings it back.
 */
export default function LogoDock() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLImageElement>(".hero-logo");
    const slot = document.querySelector<HTMLElement>(".topbar-logo img");
    const bar = document.querySelector<HTMLElement>(".topbar");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!hero || !slot || !bar || !motion.matches) {
      root.classList.add("logo-docked");
      return;
    }

    const fly = hero.cloneNode() as HTMLImageElement;
    fly.className = "logo-fly";
    fly.alt = "";
    fly.setAttribute("aria-hidden", "true");
    fly.removeAttribute("fetchpriority");
    document.body.appendChild(fly);
    root.classList.add("logo-flying");

    // Where the hero logo sits on the page, and the scroll distance the
    // flight takes. Longer than the distance to the nav, so the logo visibly
    // lags the page and glides up into the slot.
    let base = { top: 0, left: 0, width: 1 };
    let travel = 1;
    const SLOWER = 1.9;
    // Ease-out: moves right away, then settles gently into the slot.
    const ease = (t: number) => 1 - (1 - t) * (1 - t);

    const measure = () => {
      const h = hero.getBoundingClientRect();
      base = { top: h.top + scrollY, left: h.left + scrollX, width: h.width };
      const slotInBar =
        slot.getBoundingClientRect().top - bar.getBoundingClientRect().top;
      travel = Math.max(1, (base.top - slotInBar) * SLOWER);
      fly.style.width = `${h.width}px`;
      fly.style.left = `${base.left - scrollX}px`;
      // Fixed at the logo's position with the page at the top.
      fly.style.top = `${base.top}px`;
    };

    const update = () => {
      const linear = Math.min(1, Math.max(0, scrollY / travel));
      const p = ease(linear);
      const n = slot.getBoundingClientRect();
      const tx = (n.left - (base.left - scrollX)) * p;
      const ty = (n.top - base.top) * p;
      const s = 1 + (n.width / base.width - 1) * p;
      fly.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      root.classList.toggle("logo-docked", linear >= 1);
    };

    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    // Fonts and images can shift the header slightly after first paint.
    document.fonts?.ready.then(remeasure);
    window.addEventListener("load", remeasure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", remeasure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      fly.remove();
      root.classList.remove("logo-flying");
      root.classList.add("logo-docked");
    };
  }, []);

  return null;
}
