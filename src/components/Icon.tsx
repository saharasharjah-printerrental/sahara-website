import { FC, SVGProps } from "react";
import { motion, Variants } from "framer-motion";

// Define the icon variants for 3D animations
const iconVariants: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },
  hover: {
    rotateX: 10,
    rotateY: 10,
    rotateZ: 5,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    rotateX: 5,
    rotateY: 5,
    rotateZ: 2,
    scale: 0.95,
  },
};

// Import all icons from the local icons directory
import * as LocalIcons from "./icons";

// Type definitions
export type IconName = keyof typeof LocalIcons;
type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  animation?: "hover" | "press" | "none";
  onClick?: () => void;
  style?: React.CSSProperties;
};

// Map icon names to their components
const iconMap: Record<IconName, FC<SVGProps<SVGSVGElement>>> = LocalIcons;

/**
 * A standardized icon component with 3D animation capabilities
 * Replaces inconsistent icon imports throughout the codebase
 */
const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  animation = "hover",
  onClick,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon library`);
    return null;
  }

  // Handle different animation types
  const animate = animation === "hover" ? "hover" : animation === "press" ? "tap" : undefined;
  
  const baseClassName = `
    flex-shrink-0
    ${animation === "hover" ? "transition-transform" : ""}
    ${animation === "press" ? "active:scale-95" : ""}
    ${className}
  `;

  return (
    <IconComponent
      width={size}
      height={size}
      className={baseClassName}
      style={{ color }}
      {...props}
      onClick={onClick}
    />
  );
};

export default Icon;