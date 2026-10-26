"use client";

import { useEffect, type ReactNode } from "react";

export function MotionShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element = entry.target as HTMLElement;
          element.classList.remove("motion-pending");
          element.classList.add("motion-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    const initiallyVisible = new Set(
      elements.filter((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
      }),
    );

    for (const element of elements) {
      if (initiallyVisible.has(element)) {
        element.classList.add("motion-visible");
      } else {
        element.classList.add("motion-pending");
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return <div className="site-shell">{children}</div>;
}
