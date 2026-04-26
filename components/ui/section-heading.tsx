type SectionHeadingProps = {
  label: string;
  title: string;
  intro?: string;
  centered?: boolean;
};

export function SectionHeading({ label, title, intro, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">
        {label}
      </p>
      <h2 className="font-display text-4xl leading-tight text-ink-900 sm:text-5xl">{title}</h2>
      {intro ? (
        <p className="mt-5 text-base leading-8 text-plum-800/75 sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}
