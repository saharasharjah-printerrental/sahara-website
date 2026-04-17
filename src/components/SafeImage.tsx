"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function SafeImage({ fallbackSrc = "/images/heroPrntr1.webp", alt, ...props }: SafeImageProps) {
  const [src, setSrc] = useState(props.src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error && fallbackSrc) {
      setError(true);
      setSrc(fallbackSrc);
    }
  };

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={handleError}
    />
  );
}
