"use client";

import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/**
 * PVC / ID card icon. Hover: the photo square and stripe lines animate in
 * with a short stagger, as if the card is printing.
 */
export default function IdCardIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  autoplay = false,
  ...rest
}: AnimatedIconProps) {
  const animate = autoplay ? "visible" : undefined;
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="rest"
      whileHover="visible"
      animate={animate}
      {...rest}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <motion.rect
        x="6"
        y="8"
        width="4"
        height="4"
        rx="1"
        variants={{ rest: { scale: 1, opacity: 1 }, visible: { scale: [1, 1.12, 1] } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.line
        x1="13"
        y1="9"
        x2="18"
        y2="9"
        variants={{ rest: { pathLength: 1, opacity: 1 }, visible: { pathLength: [0, 1] } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.line
        x1="13"
        y1="12"
        x2="18"
        y2="12"
        variants={{ rest: { pathLength: 1, opacity: 1 }, visible: { pathLength: [0, 1] } }}
        transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
      />
      <motion.line
        x1="6"
        y1="15.5"
        x2="18"
        y2="15.5"
        variants={{ rest: { pathLength: 1, opacity: 1 }, visible: { pathLength: [0, 1] } }}
        transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
