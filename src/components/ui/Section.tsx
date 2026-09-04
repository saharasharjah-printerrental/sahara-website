import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Tone = "base" | "raised" | "ink";

interface Props {
  id?: string;
  /** Small uppercase label above the title. Keep it to two or three words. */
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** base = page background, raised = one step up, ink = deepest (for contrast bands). */
  tone?: Tone;
  /** Centre the header block. Body content is unaffected. */
  align?: "left" | "center";
  /** Suppress the top hairline — use on the first section after a hero. */
  flush?: boolean;
  className?: string;
  children?: ReactNode;
}

const toneClass: Record<Tone, string> = {
  base: "bg-surface",
  raised: "bg-surface-low",
  ink: "bg-ink",
};

/**
 * The single source of vertical rhythm and horizontal gutter for the site.
 *
 * Before this existed every page hand-rolled `py-20 px-6 max-w-7xl mx-auto`
 * with slightly different numbers, which is most of why the site read as
 * generic. Everything now inherits one measure (max-w-content) and one
 * section spacing token.
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "base",
  align = "left",
  flush = false,
  className = "",
  children,
}: Props) {
  const hasHeader = Boolean(eyebrow || title || subtitle);

  return (
    <section
      id={id}
      className={`${toneClass[tone]} ${flush ? "" : "hairline"} py-section px-6 ${className}`}
    >
      <div className="max-w-content mx-auto">
        {hasHeader && (
          <Reveal className={`mb-14 ${align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}>
            {eyebrow && (
              <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="font-sora text-title font-bold text-white">{title}</h2>}
            {subtitle && <p className="text-body text-muted mt-5">{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
