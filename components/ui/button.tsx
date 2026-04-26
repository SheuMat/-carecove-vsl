import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-[0.02em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variants = {
  primary:
    "border-transparent bg-gradient-to-r from-plum-600 via-plum-500 to-plum-400 px-5 py-3 text-white shadow-soft hover:-translate-y-0.5 hover:shadow-glow",
  gold: "border-transparent bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 px-5 py-3 text-ink-900 shadow-gold hover:-translate-y-0.5",
  ghost:
    "border-white/20 bg-white/5 px-5 py-3 text-white backdrop-blur hover:border-gold-300/50 hover:bg-white/10",
  outline:
    "border-plum-200 bg-white px-5 py-3 text-plum-800 hover:border-plum-400 hover:bg-plum-50"
} as const;

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  target,
  rel,
  type = "button",
  onClick,
  disabled
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], disabled && "pointer-events-none opacity-60", className);

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a className={classes} href={href} rel={rel} target={target}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
