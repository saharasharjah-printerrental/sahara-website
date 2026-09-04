"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, REVEAL_VIEWPORT } from "@/lib/motion";

interface Props {
  children: ReactNode;
  /** Seconds to offset this element's reveal — use for hand-tuned sequences. */
  delay?: number;
  className?: string;
  /** Render as a different element when the default <div> would break layout. */
  as?: "div" | "section" | "li" | "article";
}

/**
 * Scroll-reveal wrapper. This is deliberately the only new client boundary most
 * pages need: server components stay server components and just wrap their
 * sections in <Reveal>.
 *
 * Always renders the same motion element on server and client — branching on
 * framer-motion's useReducedMotion() here caused a hydration mismatch, because
 * that hook reads the media query synchronously on the client but has nothing
 * to read on the server, so the two renders produced different DOM/attributes.
 * prefers-reduced-motion is instead handled purely in CSS: the
 * `[data-reveal]` rule under `@media (prefers-reduced-motion: reduce)` in
 * globals.css forces opacity/transform back to their resting state, so both
 * renders stay identical and only the stylesheet decides whether it animates.
 */
export default function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
