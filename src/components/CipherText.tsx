"use client";

import { useState, useEffect, useRef } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface CipherTextProps {
  text: string;
  textSize?: string;
  className?: string;
  textColor?: string;
  delay?: number;
}

export function CipherText({ 
  text, 
  textSize = "text-6xl",
  className = "",
  textColor = "#f5be53",
  delay = 0
}: CipherTextProps) {
  const [mounted, setMounted] = useState(false);
  const [displayChars, setDisplayChars] = useState<string[]>(() => text.split(""));
  const [isComplete, setIsComplete] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStartAnimation(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startAnimation || !mounted) return;

    let iteration = 0;
    const maxIterations = text.length;
    const originalChars = text.split("");

    intervalRef.current = setInterval(() => {
      setDisplayChars((prev) =>
        prev.map((char, index) => {
          if (originalChars[index] === " ") return " ";
          if (index < iteration) {
            return originalChars[index];
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayChars(originalChars);
        setIsComplete(true);
      }
    }, 30);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAnimation, mounted, text]);

  return (
    <div className={`relative cursor-default ${textSize} font-bold leading-tight ${className}`}>
      <span className="whitespace-nowrap">
        {displayChars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-colors duration-300"
            style={{ color: textColor }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}