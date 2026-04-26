import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

export function TestimonialsSection() {
  return (
    <section className="px-5 py-20 sm:px-8" id="proof">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          centered
          label="Real Results"
          title="Care business owners who chose to grow with Care Cove"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {siteContent.testimonials.map((testimonial) => (
            <article className="rounded-[2rem] border border-plum-100 bg-white p-7 shadow-soft" key={testimonial.name}>
              <div className="text-gold-500">★★★★★</div>
              <p className="mt-5 text-base leading-8 text-plum-800/76">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-plum-700 to-plum-500 text-sm font-semibold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-ink-900">{testimonial.name}</div>
                  <div className="text-sm text-plum-800/60">{testimonial.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
