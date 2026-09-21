import { useEffect, useState } from "react";

/** True once the page has scrolled past the given offset (defaults to one viewport). */
export function useScrolled(offset?: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      const limit = offset ?? window.innerHeight * 0.85;
      setScrolled(window.scrollY > limit);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [offset]);

  return scrolled;
}
