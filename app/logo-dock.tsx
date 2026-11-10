"use client";

import { useEffect } from "react";

/**
 * Scroll-linked: the hero logo shrinks and glides into the nav's logo slot as
 * the page scrolls, then hands over to the real nav logo. The nav logo is
 * hidden by CSS only while this can run (scripting on, motion allowed), and
 * `logo-docked` on <html> brings it back.
 */
export default function LogoDock() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>(".hero-logo");
    const slot = document.querySelector<HTMLElement>(".topbar-logo img");
    const bar = document.querySelector<HTMLElement>(".topbar");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!hero || !slot || !bar || !motion.matches) {
      root.classList.add("logo-docked");
      return;
    }

    // Untransformed hero logo position, in page coordinates.
    let base = { top: 0, left: 0, width: 1 };
    // Scroll distance over which the logo travels: until its natural position
    // reaches the slot's line in the stuck nav.
    let travel = 1;

    const measure = () => {
      hero.style.transform = "";
      const h = hero.getBoundingClientRect();
      base = { top: h.top + scrollY, left: h.left + scrollX, width: h.width };
      const slotInBar =
        slot.getBoundingClientRect().top - bar.getBoundingClientRect().top;
      travel = Math.max(1, base.top - slotInBar);
    };

    const update = () => {
      const y = scrollY;
      const p = Math.min(1, Math.max(0, y / travel));
      const n = slot.getBoundingClientRect();
      const startLeft = base.left - scrollX;
      // Viewport position the logo should have now, eased from its spot in the
      // hero to the nav slot, minus where scrolling alone would put it.
      const tx = (n.left - startLeft) * p;
      const ty = base.top + (n.top - base.top) * p - (base.top - y);
      const s = 1 + (n.width / base.width - 1) * p;
      hero.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      root.classList.toggle("logo-docked", p >= 1);
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      hero.style.transform = "";
      root.classList.add("logo-docked");
    };
  }, []);

  return null;
}
