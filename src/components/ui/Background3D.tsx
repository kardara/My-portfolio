import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ParticleScene } from "./particleScene";

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * Fixed WebGL particle cloud drawn on the hero's `data-stage="<shape>"` element. It scrolls
 * with the hero, fades out below it, and morphs when the hero changes the shape.
 */
const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasWebGL()) return;

    let scene: ParticleScene | undefined;
    let cancelled = false;
    let mo: MutationObserver | undefined;

    // three.js is loaded in its own chunk, after the page is up
    import("./particleScene").then(({ createParticleScene }) => {
      if (cancelled) return;
      const s = createParticleScene(canvas, { reduceMotion: reduce });
      scene = s;
      s.setStage(document.querySelector<HTMLElement>("[data-stage]"));
      setReady(true);

      // Re-read the palette when the theme toggles
      mo = new MutationObserver(() => s.refreshColor());
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    });

    return () => {
      cancelled = true;
      mo?.disconnect();
      scene?.dispose();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    />
  );
};

export default Background3D;
