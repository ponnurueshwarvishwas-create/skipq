'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Hero3DScene } from './Hero3DScene';
import { Hero3DFallback } from './Hero3DFallback';

export function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted || !hasWebGL) {
    return <Hero3DFallback />;
  }

  return (
    <div className="w-full h-full min-h-[560px] lg:min-h-[700px] xl:min-h-[760px] relative select-none pointer-events-auto [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
      <Canvas
        camera={{ position: [0.35, 0.0, 10.8], fov: 42 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
