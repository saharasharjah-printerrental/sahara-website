"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Lamination / hologram-film icon. Hover: layers fan apart then settle. */
export default function LayersIcon({
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
        d="M12 4l8 4l-8 4l-8 -4z"
        variants={{ rest: { y: 0 }, visible: { y: -1.5 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.path
        d="M4 12l8 4l8 -4"
        variants={{ rest: { y: 0 }, visible: { y: 1.5 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.path
        d="M4 16l8 4l8 -4"
        variants={{ rest: { y: 0 }, visible: { y: 3 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
