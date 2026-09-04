"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// lottie-react touches the DOM/canvas on import, and every page in this repo
// runs `export const runtime = 'edge'` — so the player is loaded client-side
// only, never during the edge SSR pass. `ssr: false` is what enforces that.
// `Lottie` (v3 API) fetches its own `src` URL/path, so no manual fetch here.
const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie), {
  ssr: false,
});

interface Props {
  /** Path to the exported Lottie JSON under public/animations/<name>/. */
  animationPath: string;
  /** Static WebP shown while the JSON loads and under prefers-reduced-motion. */
  poster: { src: string; alt: string; width: number; height: number };
  loop?: boolean;
  className?: string;
}

/**
 * Hero-scale Lottie player with a static-image fallback. Two failure modes are
 * handled deliberately: prefers-reduced-motion (CSS hides [data-lottie] and
 * shows [data-lottie-poster] — see globals.css) and a load failure for the
 * animation itself, which the library reports via its `subscriptions.error`
 * callback and flips this component back to the poster via state.
 */
export default function LottieHero({ animationPath, poster, loop = true, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={className}>
      <Image
        data-lottie-poster
        src={poster.src}
        alt={poster.alt}
        width={poster.width}
        height={poster.height}
        className="hidden h-auto w-full"
      />
      {!failed && (
        <div data-lottie>
          <Lottie
            src={animationPath}
            loop={loop}
            autoplay
            aria-hidden="true"
            subscriptions={{ error: () => setFailed(true) }}
          />
        </div>
      )}
    </div>
  );
}
