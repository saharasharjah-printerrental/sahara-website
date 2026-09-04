import type { SVGProps } from "react";

/**
 * Shared contract for this site's animated icon set — ported from itsHover.com
 * (github.com/airbnb/lottie-android is the Android Lottie runtime and cannot
 * run in a browser; these are framer-motion components instead, which needed
 * no new dependency since framer-motion ^11.18.2 is already installed).
 *
 * Port notes vs. the itsHover source:
 * - `motion/react` -> `framer-motion` (this repo is on framer-motion v11, which
 *   is the pre-rename package; "motion/react" is the newer package's import path).
 * - `useAnimate`'s string-selector form is dropped in favour of driving each
 *   sub-path from React state via `variants`, so icons work inside RSC-rendered
 *   pages without each one needing its own DOM-scoped `useAnimate` handle.
 */
export interface AnimatedIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  | "ref"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  /** Loop the animation continuously instead of only on hover/focus. */
  autoplay?: boolean;
}
