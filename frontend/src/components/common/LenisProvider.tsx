"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Animation duration (lower = faster, higher = slower/heavier)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2, // Reduced from 1 to make scrolling lighter
      touchMultiplier: 1.2, // Controls touch sensitivity
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // This component doesn't render anything
}
