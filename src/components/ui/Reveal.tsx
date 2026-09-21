import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "fade" | "media";
  threshold?: number;
  style?: CSSProperties;
  id?: string;
};

/**
 * Scroll-triggered reveal wrapper.
 * `fade` lifts and fades content; `media` wipes an image up while easing out its scale.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "fade",
  threshold,
  style,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const base = variant === "media" ? "reveal-media" : "reveal";

  return (
    <Tag
      id={id}
      ref={ref}
      className={`${base} ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
