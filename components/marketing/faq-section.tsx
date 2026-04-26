import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

export function FaqSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading centered label="Common Questions" title="Frequently asked questions" />
        <div className="mt-12 space-y-4">
          {siteContent.faq.map((item) => (
            <details
              className="group rounded-[1.75rem] border border-plum-100 bg-mist px-6 py-5 shadow-soft"
              key={item.question}
            >
              <summary className="cursor-pointer list-none font-display text-2xl text-ink-900">
                {item.question}
              </summary>
              <p className="mt-4 text-base leading-8 text-plum-800/74">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
