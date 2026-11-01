import React, { useRef, useEffect } from 'react';

interface WireframeScaffoldProps {
  style?: React.CSSProperties;
}

export const WireframeScaffold: React.FC<WireframeScaffoldProps> = ({ style }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scanBeamRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scanBeam = scanBeamRef.current;
    if (!scanBeam) return;

    let rafId: number;
    const duration = 2200; // 2.2 second downward sweep
    const startTime = performance.now();

    const updateScan = (now: number) => {
      const elapsed = (now - startTime) % duration;
      const progress = elapsed / duration; // 0 -> 1

      // Downward radar scan sweep from 110% (above top) down to -15% (past bottom)
      const center = 110 - progress * 125;
      const halfBand = 4.5;
      const low = (center - halfBand).toFixed(2);
      const high = (center + halfBand).toFixed(2);
      const c = center.toFixed(2);

      // Matches Framer's exact linear-gradient scan beam mask
      const maskStr = `linear-gradient(0deg, rgba(0,0,0,0) ${low}%, rgb(0,0,0) ${c}%, rgba(0,0,0,0) ${high}%)`;
      scanBeam.style.webkitMask = maskStr;
      scanBeam.style.mask = maskStr;

      rafId = requestAnimationFrame(updateScan);
    };

    rafId = requestAnimationFrame(updateScan);

    // Parallax tracking mouse
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let parallaxRaf: number;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 16;
      const ny = (e.clientY / window.innerHeight - 0.5) * 16;
      targetX = nx;
      targetY = ny;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      parallaxRaf = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    parallaxRaf = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(parallaxRaf);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style
      }}
    >
      <div
        ref={parallaxRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          willChange: 'transform'
        }}
      >
        {/* Layer 1: Ambient subtle wireframe grid (always faintly visible) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.16
          }}
        >
          <img
            src="/assets/hero/bg-pattern.png"
            alt="Scaffold Wireframe Grid"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              userSelect: 'none'
            }}
          />
        </div>

        {/* Layer 2: Illuminated moving radar scan beam (sweeps continuously from top to bottom) */}
        <div
          ref={scanBeamRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.85
          }}
        >
          <img
            src="/assets/hero/bg-pattern.png"
            alt="Scaffold Scan Beam"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              userSelect: 'none',
              filter: 'contrast(1.2) brightness(1.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
