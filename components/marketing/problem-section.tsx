import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

export function ProblemSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8" id="pain">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Sound Familiar?"
          title="You didn't start a care business to feel this stuck. But here you are."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteContent.problems.map((problem) => (
            <article
              className="rounded-[2rem] border border-plum-100 bg-mist p-7 shadow-soft"
              key={problem.title}
            >
              <div className="text-3xl">{problem.icon}</div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-ink-900">
                {problem.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-plum-800/75">{problem.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
