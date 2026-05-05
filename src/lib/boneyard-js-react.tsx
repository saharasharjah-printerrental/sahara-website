import React from "react";

interface SkeletonProps {
  loading?: boolean;
  name?: string;
  color?: string;
  darkColor?: string;
  animate?: "pulse" | "shimmer" | "solid";
  stagger?: number | boolean;
  transition?: number | boolean;
  boneClass?: string;
  children?: React.ReactNode;
}

export function Skeleton({ loading = false, children, ...props }: SkeletonProps) {
  if (loading) {
    return (
      <div 
        className="animate-pulse bg-slate-700 rounded"
        style={{ minHeight: '1rem' }}
        {...props}
      />
    );
  }
  return <>{children}</>;
}
