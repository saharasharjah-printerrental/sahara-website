"use client";
import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

/** Delivery / logistics icon. Hover: cab nudges forward, wheels spin. */
export default function TruckIcon({
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
        variants={{ rest: { x: 0 }, visible: { x: [0, 2, 0] } }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <rect x="2" y="8" width="10" height="8" rx="1" />
        <path d="M12 11h4l3 3v2h-7z" />
      </motion.g>
      <motion.circle
        cx="7"
        cy="17"
        r="1.6"
        variants={{ rest: { rotate: 0 }, visible: { rotate: 180 } }}
        style={{ transformOrigin: "7px 17px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.circle
        cx="16"
        cy="17"
        r="1.6"
        variants={{ rest: { rotate: 0 }, visible: { rotate: 180 } }}
        style={{ transformOrigin: "16px 17px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
