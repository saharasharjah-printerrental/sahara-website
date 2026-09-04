"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Security-card icon. Hover: checkmark draws in after the shield settles. */
export default function ShieldCheckIcon({
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
        d="M12 3l7 3v6c0 4.5 -3 7.5 -7 9c-4 -1.5 -7 -4.5 -7 -9v-6l7 -3z"
        variants={{ rest: { scale: 1 }, visible: { scale: [1, 1.04, 1] } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M9 12l2 2l4 -4"
        variants={{ rest: { pathLength: 1, opacity: 1 }, visible: { pathLength: [0, 1], opacity: [0, 1] } }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
