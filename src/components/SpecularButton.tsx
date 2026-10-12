"use client";

import { useCallback, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

interface SpecularButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  followMouse?: boolean;
  proximity?: number;
  className?: string;
  ariaLabel?: string;
}

const SIZE_STYLES: Record<string, { padding: string; fontSize: string }> = {
  sm: { padding: "0.5rem 1.1rem", fontSize: "0.875rem" },
  md: { padding: "0.7rem 1.5rem", fontSize: "1rem" },
  lg: { padding: "1rem 2.25rem", fontSize: "1.125rem" },
};

export default function SpecularButton({
  children,
  onClick,
  href,
  size = "md",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0.04,
  textColor = "#412d00",
  lineColor = "#f5be53",
  baseColor = "#f5be53",
  intensity = 1,
  idleIntensity = 0.35,
  shineSize = 10,
  shineFade = 34,
  thickness = 1.2,
  glow = 1,
  followMouse = true,
  proximity = 250,
  className = "",
  ariaLabel,
}: SpecularButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const applyPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      el.style.setProperty("--spec-x", `${(x / rect.width) * 100}%`);
      el.style.setProperty("--spec-y", `${(y / rect.height) * 100}%`);

      const distance = Math.hypot(x - centerX, y - centerY);
      const maxDistance = Math.hypot(centerX, centerY) || 1;
      const near = Math.max(0, 1 - Math.max(0, distance - maxDistance) / proximity);
      const active = Math.min(1, intensity * near);

      el.style.setProperty("--spec-intensity", String(active));
      el.style.setProperty("--spec-tilt-x", `${((y - centerY) / centerY) * -2}deg`);
      el.style.setProperty("--spec-tilt-y", `${((x - centerX) / centerX) * 2}deg`);
    },
    [intensity, proximity]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spec-intensity", String(idleIntensity));
    el.style.setProperty("--spec-x", "50%");
    el.style.setProperty("--spec-y", "50%");
    el.style.setProperty("--spec-tilt-x", "0deg");
    el.style.setProperty("--spec-tilt-y", "0deg");
  }, [idleIntensity]);

  const handleMove = (e: MouseEvent) => {
    if (!followMouse) return;
    applyPointer(e.clientX, e.clientY);
  };

  const style = {
    "--spec-radius": `${radius}px`,
    "--spec-tint": tint,
    "--spec-tint-opacity": tintOpacity,
    "--spec-text": textColor,
    "--spec-line": lineColor,
    "--spec-base": baseColor,
    "--spec-shine-size": `${shineSize}rem`,
    "--spec-shine-fade": `${shineFade}%`,
    "--spec-thickness": `${thickness}px`,
    "--spec-glow": glow,
    "--spec-intensity": idleIntensity,
    "--spec-x": "50%",
    "--spec-y": "50%",
    "--spec-tilt-x": "0deg",
    "--spec-tilt-y": "0deg",
    ...SIZE_STYLES[size],
  } as CSSProperties;

  const shineStyle = { opacity: "var(--spec-intensity)" };

  const classes = `specular-button ${className}`;

  const shine = (
    <>
      <span className="specular-button__tint" aria-hidden="true" />
      <span className="specular-button__shine" style={shineStyle} aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <a
        ref={(el) => {
          ref.current = el;
        }}
        href={href}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {shine}
        <span className="specular-button__label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={(el) => {
        ref.current = el;
      }}
      type="button"
      className={classes}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {shine}
      <span className="specular-button__label">{children}</span>
    </button>
  );
}
