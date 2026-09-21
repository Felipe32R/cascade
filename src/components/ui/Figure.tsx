import { Reveal } from "./Reveal";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  ratio?: string;
  delay?: number;
  priority?: boolean;
};

/** Image with wipe reveal and optional editorial caption. */
export function Figure({ src, alt, caption, className = "", ratio, delay, priority }: Props) {
  return (
    <figure className={`figure ${className}`.trim()}>
      <Reveal variant="media" delay={delay} className="figure__media" style={ratio ? { aspectRatio: ratio } : undefined}>
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      </Reveal>
      {caption ? <figcaption className="figure__caption caption">{caption}</figcaption> : null}
    </figure>
  );
}
