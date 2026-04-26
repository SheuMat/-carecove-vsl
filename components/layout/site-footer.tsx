import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { servicePages } from "@/content/services";
import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr,0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
            Care Cove Limited
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-white">
            Supporting UK care and healthcare businesses to grow with confidence.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
            UK-wide consultancy support for care providers covering CQC registration, tender writing,
            private client growth, Google Ads, AI systems, and commercial strategy.
          </p>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              Popular Services
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className="text-sm text-white/60 transition-colors hover:text-gold-200" href="/services">
                Care Business Consultant UK
              </Link>
              {servicePages.map((service) => (
                <Link
                  className="text-sm text-white/60 transition-colors hover:text-gold-200"
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h3 className="font-display text-3xl text-white">Ready to move?</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Start with a free strategy conversation and we&apos;ll show you the next commercial move for
            your care business.
          </p>
          <div className="mt-6">
            <Button href="https://scheduler.zoom.us/sheu-matewe/free-consultation" target="_blank" variant="gold">
              Book Your Free Strategy Call
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/55">
            <Link className="hover:text-gold-200" href="/tenders">
              Live Tenders
            </Link>
            {siteContent.socials.map((item) => (
              <a
                className="inline-flex items-center gap-2 hover:text-gold-200"
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon className="h-4 w-4 shrink-0" platform={item.platform} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/40 sm:px-8">
        © 2026 Care Cove Limited. All rights reserved. Registered in England &amp; Wales.
      </div>
    </footer>
  );
}
