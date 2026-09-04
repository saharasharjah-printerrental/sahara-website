"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Encoding / configuration icon. Hover: gear rotates continuously while hovered. */
export default function SettingsIcon({
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
      <motion.g
        style={{ transformOrigin: "12px 12px" }}
        variants={{ rest: { rotate: 0 }, visible: { rotate: 90 } }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4 -1.4M18.4 5.6l1.4 -1.4" />
      </motion.g>
    </motion.svg>
  );
}
