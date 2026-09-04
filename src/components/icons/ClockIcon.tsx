"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Turnaround / rental-term icon. Hover: hands sweep forward once. */
export default function ClockIcon({
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
      <circle cx="12" cy="12" r="9" />
      <motion.line
        x1="12"
        y1="12"
        x2="12"
        y2="7"
        variants={{ rest: { rotate: 0 }, visible: { rotate: 300 } }}
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.line
        x1="12"
        y1="12"
        x2="15.5"
        y2="13.5"
        variants={{ rest: { rotate: 0 }, visible: { rotate: 90 } }}
        style={{ transformOrigin: "12px 12px" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
