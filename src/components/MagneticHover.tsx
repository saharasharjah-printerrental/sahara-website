"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";

const MagneticChar = ({
  char,
  mouseX,
  mouseY,
  textSize = "text-6xl",
  maxWeight = 900,
  minWeight = 200,
  activeColor = "#f5be53",
  inactiveColor = "#6b7280",
  distanceRange = [0, 200],
  colorRange = [0, 150],
}: {
  char: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  textSize?: string;
  maxWeight?: number;
  minWeight?: number;
  activeColor?: string;
  inactiveColor?: string;
  distanceRange?: [number, number];
  colorRange?: [number, number];
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useMotionValue(0);

  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;
    const d = Math.sqrt(
      Math.pow(mouseX.get() - charX, 2) + Math.pow(mouseY.get() - charY, 2)
    );
    distance.set(d);
  });

  const weight = useTransform(distance, distanceRange, [maxWeight, minWeight]);
  const color = useTransform(distance, colorRange, [activeColor, inactiveColor]);

  return (
    <motion.span
      ref={ref}
      style={{ fontWeight: weight, color }}
      className={`inline-block ${textSize} font-bold transition-colors duration-75 origin-center`}
    >
      {char}
    </motion.span>
  );
};

interface MagneticHoverProps {
  text?: string;
  textSize?: string;
  maxWeight?: number;
  minWeight?: number;
  activeColor?: string;
  inactiveColor?: string;
  distanceRange?: [number, number];
  colorRange?: [number, number];
  className?: string;
}

export function MagneticHover({
  text = "MAGNETIC",
  textSize = "text-6xl",
  maxWeight = 900,
  minWeight = 200,
  activeColor = "#f5be53",
  inactiveColor = "#6b7280",
  distanceRange = [0, 200],
  colorRange = [0, 150],
  className = "",
}: MagneticHoverProps) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-wrap">
        {text.split("").map((char, i) => (
          <MagneticChar
            key={i}
            char={char === " " ? "\u00A0" : char}
            mouseX={mouseX}
            mouseY={mouseY}
            textSize={textSize}
            maxWeight={maxWeight}
            minWeight={minWeight}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            distanceRange={distanceRange}
            colorRange={colorRange}
          />
        ))}
      </div>
    </div>
  );
}
