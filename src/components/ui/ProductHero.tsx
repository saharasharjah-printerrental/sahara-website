"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, fadeIn } from "@/lib/motion";
import type { Crumb } from "./Breadcrumbs";
import Breadcrumbs from "./Breadcrumbs";

interface Action {
  label: string;
  href: string;
}

interface Props {
  trail: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  /** The AEO answer block, or any hero-level body content — rendered as-is below the title. */
  answer?: ReactNode;
  badges?: string[];
  image?: { src: string; alt: string; width: number; height: number };
  primaryCta: Action;
  secondaryCta?: Action;
}

/**
 * Apple-style product hero: oversized type on the left, product on a soft
 * radial glow on the right, no boxed card around either half. This is a client
 * component only for the entrance animation — all content is passed in from
 * the server page, so there's no data fetching or interactivity to hydrate.
 */
export default function ProductHero({
  trail,
  eyebrow,
  title,
  answer,
  badges,
  image,
  primaryCta,
  secondaryCta,
}: Props) {
  // initial/animate are fixed, not derived from useReducedMotion() — that hook
  // reads the media query synchronously on the client but has nothing to read
  // on the server, so branching on it here produced a hydration mismatch
  // (server and client disagreeing on the inline style framer-motion renders
  // for `initial`). Both wrappers below carry data-reveal instead, so the same
  // CSS rule that neutralises Reveal.tsx under prefers-reduced-motion applies
  // here too — see globals.css.
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-14 md:pt-20">
      {/* Radial glow — pure CSS, no image weight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[36rem] w-[36rem] -translate-y-1/3 translate-x-1/4 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #f5be53 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-content">
        <Breadcrumbs trail={trail} />
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div data-reveal initial="hidden" animate="visible" variants={fadeUp}>
            {eyebrow && (
              <p className="mb-5 inline-flex items-center gap-2 rounded-pill border border-primary/30 bg-primary/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="font-sora text-display-xl font-extrabold text-white">{title}</h1>
            {answer && <div className="mt-6">{answer}</div>}
            {badges && badges.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {badges.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-caption text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>

          {image && (
            <motion.div
              data-reveal
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.15 }}
              className="relative mx-auto w-full max-w-sm md:max-w-none"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                className="mx-auto h-auto w-full drop-shadow-2xl"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
