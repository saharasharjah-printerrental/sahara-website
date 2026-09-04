import Link from "next/link";
import type { ReactNode } from "react";

interface Action {
  label: string;
  href: string;
}

interface Props {
  title: string;
  body?: ReactNode;
  primary: Action;
  secondary?: Action;
}

/**
 * The closing call-to-action. Replaces the gold gradient block that was
 * duplicated, with slightly different radii and padding, at the foot of every
 * page.
 */
export default function CtaBand({ title, body, primary, secondary }: Props) {
  return (
    <section className="px-6 py-section">
      <div className="mx-auto max-w-content">
        <div className="gold-gradient rounded-panel px-8 py-14 text-center md:px-16 md:py-20">
          <h2 className="font-sora text-title font-bold text-on-primary">{title}</h2>
          {body && (
            <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-on-primary/80">{body}</p>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primary.href}
              className="rounded-pill bg-surface px-9 py-4 font-bold text-white transition-transform duration-300 hover:scale-105"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="rounded-pill border border-on-primary/25 px-9 py-4 font-bold text-on-primary transition-colors duration-300 hover:bg-on-primary/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
