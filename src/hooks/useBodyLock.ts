import { useEffect } from "react";

/** Locks body scroll while `locked` is true. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}
