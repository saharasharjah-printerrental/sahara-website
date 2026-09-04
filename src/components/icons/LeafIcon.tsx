"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Wooden / eco-friendly card icon. Hover: leaf sways once. */
export default function LeafIcon({
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
      <motion.path
        d="M5 21c8 -2 13 -7 15 -16c-9 1 -14 5 -15 12"
        variants={{ rest: { rotate: 0 }, visible: { rotate: [0, -4, 0] } }}
        style={{ transformOrigin: "5px 21px" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M6 20c2 -4 5 -7 9 -9"
        variants={{ rest: { pathLength: 1 }, visible: { pathLength: [0, 1] } }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
