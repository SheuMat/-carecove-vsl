import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/content/site";

export function VslSection() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          centered
          intro={siteContent.video.intro}
          label={siteContent.video.label}
          title={siteContent.video.title}
        />
        <div className="mt-12 rounded-[2rem] border border-plum-100 bg-white p-4 shadow-glow sm:p-6">
          <div className="relative w-full overflow-hidden rounded-[1.5rem] shadow-xl aspect-video">
            <iframe
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              loading="eager"
              src="https://player.vimeo.com/video/1186232411?autoplay=1&muted=1&title=0&byline=0&portrait=0"
              title="Care Cove VSL"
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              className="min-w-[16rem] px-8 py-3.5 text-base"
              href="https://calendly.com/rapscallionai/strategy"
              rel="noreferrer"
              target="_blank"
              variant="gold"
            >
              Book Your Free Strategy Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
