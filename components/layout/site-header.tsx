"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils/cn";

function isNavItemActive(pathname: string, href: string) {
  if (href.startsWith("/#")) {
    return false;
  }

  if (href === "/tenders") {
    return pathname.startsWith("/tenders");
  }

  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-plum-200/70 bg-[#ede7f7] shadow-[0_14px_34px_rgba(20,10,46,0.12)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[84px] max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:min-h-[92px] sm:px-8">
        <Link className="flex shrink-0 items-center" href="/">
          <div className="relative h-11 w-[150px] sm:h-[50px] sm:w-[190px] lg:h-[58px] lg:w-[248px]">
            <Image
              alt="Care Cove Limited"
              className="object-contain object-left"
              fill
              priority
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 190px, 248px"
              src="/logo.png"
              unoptimized
            />
          </div>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <nav className="flex items-center gap-6">
            {siteContent.nav.map((item) => {
              const active = isNavItemActive(pathname, item.href);

              return (
                <Link
                  className={cn(
                    "text-sm font-medium text-plum-700 transition-colors hover:text-plum-900",
                    active && "text-gold-500"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="h-5 w-px bg-plum-200/90" />
          <div className="flex items-center gap-2">
            {siteContent.socials.map((item) => (
              <a
                aria-label={item.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plum-200/80 bg-white/55 text-plum-700 transition-colors hover:border-gold-300/50 hover:text-plum-900"
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon className="h-4 w-4" platform={item.platform} />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <Button href="https://scheduler.zoom.us/sheu-matewe/free-consultation" target="_blank" variant="gold">
            Book Free Call
          </Button>
        </div>

        <button
          aria-expanded={open}
          className="inline-flex rounded-full border border-plum-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-plum-800 shadow-soft lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-plum-200/70 bg-[#ede7f7] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {siteContent.nav.map((item) => {
              const active = isNavItemActive(pathname, item.href);

              return (
                <Link
                  className={cn(
                    "rounded-2xl border border-plum-200/70 bg-white/65 px-4 py-3 text-sm font-medium text-plum-700 transition-colors hover:text-plum-900",
                    active && "border-gold-300/45 bg-white text-gold-500"
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button
              href="https://scheduler.zoom.us/sheu-matewe/free-consultation"
              target="_blank"
              variant="gold"
            >
              Book Free Call
            </Button>
            <div className="mt-2 flex flex-wrap gap-3">
              {siteContent.socials.map((item) => (
                <a
                  className="inline-flex items-center gap-3 rounded-2xl border border-plum-200/70 bg-white/65 px-4 py-3 text-sm font-medium text-plum-700 transition-colors hover:text-plum-900"
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
      ) : null}
    </header>
  );
}
