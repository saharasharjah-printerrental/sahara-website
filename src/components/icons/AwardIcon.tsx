"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Exclusive / authorised / certified icon. Hover: medal tilts and settles. */
export default function AwardIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  autoplay = false,
  ...rest
}: AnimatedIconProps) {
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
      animate={autoplay ? "visible" : undefined}
      {...rest}
    >
      <circle cx="12" cy="8" r="5" />
      <motion.path
        d="M9 12.5l-1.5 6.5l4.5 -2l4.5 2l-1.5 -6.5"
        variants={{ rest: { rotate: 0 }, visible: { rotate: [0, -6, 0] } }}
        style={{ transformOrigin: "12px 12.5px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M9.5 8l1.5 1.5l3 -3"
        variants={{ rest: { pathLength: 1, opacity: 1 }, visible: { pathLength: [0, 1] } }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
