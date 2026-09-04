"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Custom hologram / overlay icon — a card with a diagonal sheen sweeping across on hover. */
export default function LayerStackIcon({
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <motion.path
        d="M6 19l6 -14"
        variants={{ rest: { x: -6, opacity: 0 }, visible: { x: 14, opacity: [0, 0.9, 0] } }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <path d="M7 15h4" opacity={0.6} />
      <path d="M7 12h6" opacity={0.6} />
    </motion.svg>
  );
}
