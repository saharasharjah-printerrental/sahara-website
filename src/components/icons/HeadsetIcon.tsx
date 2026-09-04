"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Support / after-sales icon. Hover: sound waves pulse outward. */
export default function HeadsetIcon({
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
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="5" rx="1.2" />
      <rect x="17" y="13" width="4" height="5" rx="1.2" />
      <motion.path
        d="M7 19a3 3 0 0 0 3 2h2"
        variants={{ rest: { opacity: 1 }, visible: { opacity: [0.4, 1] } }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M2 11a10 10 0 0 1 1 -4"
        variants={{ rest: { opacity: 0.3 }, visible: { opacity: [0.3, 1, 0.3] } }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 11a10 10 0 0 0 -1 -4"
        variants={{ rest: { opacity: 0.3 }, visible: { opacity: [0.3, 1, 0.3] } }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.svg>
  );
}
