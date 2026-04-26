import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

export function FounderSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8" id="founder">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          intro="Most consultants advise from the outside. Sheu Matewe built, scaled, and sold a care business and now helps others do the same."
          label="About the Founder"
          title="Built by someone who's actually done it."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,0.9fr]">
          <div className="space-y-5">
            {siteContent.founderTimeline.map((item) => (
              <article
                className="flex gap-4 rounded-[2rem] border border-plum-100 bg-mist p-6 shadow-soft"
                key={item.number}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-plum-700 to-plum-500 text-sm font-semibold tracking-[0.2em] text-white">
                  {item.number}
                </div>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ink-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-plum-800/74">{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[2.5rem] border border-plum-100 bg-[linear-gradient(180deg,#f5f2fc,#fff9ee)] p-8 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">The Difference</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-ink-900">
              Sector credibility that feels earned, not borrowed.
            </h3>
            <ul className="mt-8 space-y-4">
              {siteContent.founderCredentials.map((credential) => (
                <li
                  className="rounded-[1.5rem] border border-white bg-white px-5 py-4 text-base text-plum-800 shadow-soft"
                  key={credential}
                >
                  {credential}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
                target="_blank"
                variant="gold"
              >
                Grow With Sheu
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
