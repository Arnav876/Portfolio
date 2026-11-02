import React, { useRef, useEffect, useState } from 'react';

interface WireframeHelmetProps {
  raceMode?: boolean;
  style?: React.CSSProperties;
}

export const WireframeHelmet: React.FC<WireframeHelmetProps> = ({ raceMode = false, style }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const helmetRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const helmetEl = helmetRef.current;
    const container = containerRef.current;
    if (!helmetEl || !container || reducedMotion) return;

    let isVisible = true;
    let rafId: number | null = null;
    let startTime = performance.now();

    // 1. Page load descent parameters: 1.8s ease-out from -160px & -6deg
    const descentDuration = 1800;
    let descentComplete = false;

    // 2. Mouse tracking for subtle 3D parallax tilt (few degrees)
    const mouse = {
      targetTiltX: 0,
      targetTiltY: 0,
      currentTiltX: 0,
      currentTiltY: 0,
      targetPanX: 0,
      targetPanY: 0,
      currentPanX: 0,
      currentPanY: 0
    };

    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w - 0.5) * 2; // -1 to +1
      const ny = (e.clientY / h - 0.5) * 2; // -1 to +1

      // Tilt only a few degrees (max ~4.5deg)
      mouse.targetTiltY = nx * 4.5;
      mouse.targetTiltX = -ny * 4.0;

      // Subtle positional parallax
      mouse.targetPanX = nx * 10;
      mouse.targetPanY = ny * 8;
    };

    // 3. Scroll tracking: lift up, drift away, and fade out on scroll down
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    // 4. Animation loop combining Descent + Mouse Tilt + Scroll Lift + Idle Float
    const tick = (now: number) => {
      if (!isVisible) {
        rafId = null;
        return;
      }

      // Smooth mouse lerping
      mouse.currentTiltX += (mouse.targetTiltX - mouse.currentTiltX) * 0.08;
      mouse.currentTiltY += (mouse.targetTiltY - mouse.currentTiltY) * 0.08;
      mouse.currentPanX += (mouse.targetPanX - mouse.currentPanX) * 0.08;
      mouse.currentPanY += (mouse.targetPanY - mouse.currentPanY) * 0.08;

      // 1. Descent progress
      const elapsed = now - startTime;
      const descentProgress = Math.min(1, elapsed / descentDuration);
      // Smooth cubic ease-out: 1 - pow(1 - t, 3)
      const easeOut = 1 - Math.pow(1 - descentProgress, 3);
      if (descentProgress >= 1) descentComplete = true;

      const descentY = (1 - easeOut) * -160;
      const descentRot = (1 - easeOut) * -6.5;
      const descentScale = 1.07 - easeOut * 0.07;
      const descentOpacity = Math.min(1, easeOut * 1.5);

      // 4. Idle harmonic floating & breathing so it never looks frozen
      const idleTime = now * 0.001;
      const idleY = Math.sin(idleTime * 1.6) * 4.2;
      const idleRot = Math.sin(idleTime * 1.2) * 1.2;

      // 3. Scroll reactivity: lifts up, drifts right/away, and fades out
      const scrollLimit = 420;
      const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollLimit));
      // Ease in for scroll lift
      const scrollEase = scrollProgress * scrollProgress;
      const scrollLiftY = -scrollEase * 220;
      const scrollDriftX = scrollEase * 65;
      const scrollRotate = scrollEase * 8.5;
      const scrollOpacity = Math.max(0, 1 - scrollProgress * 1.35);

      // Composite transforms
      const totalX = (mouse.currentPanX * (descentComplete ? 1 : easeOut)) + scrollDriftX;
      const totalY = descentY + (idleY * (descentComplete ? 1 : 0.3)) + (mouse.currentPanY * (descentComplete ? 1 : easeOut)) + scrollLiftY;
      const totalRotZ = descentRot + (idleRot * (descentComplete ? 1 : 0.3)) + scrollRotate;
      const totalRotX = mouse.currentTiltX * (descentComplete ? 1 : 0.2);
      const totalRotY = mouse.currentTiltY * (descentComplete ? 1 : 0.2);
      const totalScale = descentScale;
      const totalOpacity = descentOpacity * scrollOpacity;

      helmetEl.style.transform = `perspective(1000px) translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(${totalRotZ.toFixed(2)}deg) scale(${totalScale.toFixed(3)})`;
      helmetEl.style.opacity = totalOpacity.toFixed(3);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Performance: Pause animation when hero is off-screen
    const heroEl = container.closest('#hero') || container;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (entry.isIntersecting && !rafId) {
            startTime = performance.now() - descentDuration; // Don't re-run descent if already scrolled away and back
            rafId = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(heroEl);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        ...style
      }}
    >
      {/* 3D Helmet Container */}
      <div
        ref={helmetRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          transition: reducedMotion ? 'none' : 'filter 0.3s ease'
        }}
      >
        <img
          src="/assets/hero/helmet.webp"
          alt="Arnav Yadav Racing Wireframe Helmet"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            margin: 0,
            padding: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            filter: raceMode
              ? 'drop-shadow(0 0 25px rgba(212, 255, 0, 0.45)) contrast(1.1)'
              : 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.25))'
          }}
        />
      </div>
    </div>
  );
};

export default WireframeHelmet;
