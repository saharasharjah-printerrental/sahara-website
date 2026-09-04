"use client";

import { motion, useReducedMotion } from "framer-motion";
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
 * Respects prefers-reduced-motion by rendering the content statically rather
 * than animating to the same place — that keeps the DOM free of transforms that
 * can trap focus outlines.
 */
export default function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

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
