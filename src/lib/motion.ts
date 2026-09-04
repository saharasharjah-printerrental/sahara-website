/**
 * Shared framer-motion variants.
 *
 * One easing curve across the whole site is what makes motion read as a system
 * rather than as per-page decoration: [0.16, 1, 0.3, 1] is an ease-out-expo —
 * fast to start, long settle. Durations stay under 0.65s so nothing feels slow.
 *
 * These are plain objects (no "use client" needed); the components that consume
 * them carry the client boundary.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
} as const;

/** Parent variant — children inherit `visible` on a 80ms cadence. */
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} as const;

/** Shared useInView options: fire once, slightly before the element is on screen. */
export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;
