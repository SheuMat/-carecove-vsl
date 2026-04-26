import type { SVGProps } from "react";

type SocialPlatform = "linkedin" | "tiktok";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  platform: SocialPlatform;
};

export function SocialIcon({ platform, className, ...props }: SocialIconProps) {
  if (platform === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        <path d="M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.12 18.12H5.65V9.86h2.47v8.26ZM6.88 8.73c-.8 0-1.45-.66-1.45-1.46s.65-1.45 1.45-1.45 1.46.65 1.46 1.45-.66 1.46-1.46 1.46ZM18.35 18.12h-2.47V14.1c0-.96-.02-2.2-1.34-2.2-1.35 0-1.56 1.05-1.56 2.13v4.1h-2.47V9.86h2.37V11h.03c.33-.63 1.14-1.3 2.35-1.3 2.52 0 2.99 1.66 2.99 3.82v4.6Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-1.92V15.2a5.2 5.2 0 1 1-5.2-5.2c.2 0 .39.02.58.04v2.56a2.64 2.64 0 1 0 2.06 2.57V2h2.56c.24 2.02 1.84 3.62 3.77 3.88v.81Z" />
    </svg>
  );
}
