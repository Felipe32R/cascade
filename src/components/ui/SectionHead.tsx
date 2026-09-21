import { useInView } from "../../hooks/useInView";

type Props = {
  index: string;
  label: string;
};

/** Editorial section marker: 01 ———————— LABEL */
export function SectionHead({ index, label }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div ref={ref} className={`section-head ${inView ? "is-visible" : ""}`}>
      <span className="section-head__index">{index}</span>
      <span className="section-head__rule" />
      <span className="section-head__label label">{label}</span>
    </div>
  );
}
