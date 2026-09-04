import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  /** Any component accepting { size?, className? } — the animated icon set or an MUI icon. */
  icon?: ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: ReactNode;
  /** When set the whole card becomes a link. */
  href?: string;
  delay?: number;
}

/**
 * Hairline card with a hover lift. The restraint is deliberate: one border, one
 * shadow, no gradient fill — the previous cards stacked gradients, gold borders
 * and emoji, which is what made the grids read as generic.
 */
export default function FeatureCard({ icon: Icon, title, body, href, delay }: Props) {
  const inner = (
    <div className="group h-full rounded-card border border-white/[0.08] bg-surface-low p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface-mid">
      {Icon && (
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-sora text-[1.0625rem] font-bold text-white mb-2.5">{title}</h3>
      <div className="text-[0.9rem] leading-relaxed text-muted">{body}</div>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold text-primary">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </span>
      )}
    </div>
  );

  return (
    <Reveal delay={delay} className="h-full">
      {href ? (
        <Link href={href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Reveal>
  );
}
