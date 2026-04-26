import React from "react";

declare module "boneyard-js" {
  interface SkeletonProps {
    loading: boolean;
    name?: string;
    color?: string;
    darkColor?: string;
    animate?: "pulse" | "shimmer" | "solid";
    stagger?: number | boolean;
    transition?: number | boolean;
    boneClass?: string;
    children?: React.ReactNode;
  }
  export const Skeleton: React.FC<SkeletonProps>;
}
