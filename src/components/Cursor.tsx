import React, { useEffect, useRef } from 'react';

export const Cursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable if pointer is fine and not touch / reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const container = containerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!container || !dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isInitialized = false;
    let isVisible = false;
    let animationFrameId: number;
    let lastTime = performance.now();

    const updateHoverState = (target: any) => {
      if (!target || typeof target.closest !== 'function') {
        container.classList.remove('cursor-hover');
        return;
      }

      const isInteractive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .tech-card, .btn-primary, .btn-secondary, .telemetry-chip, [style*="cursor: pointer"], [style*="cursor:pointer"]'
        ) || target.classList.contains('interactive-hover')
      );

      container.classList.toggle('cursor-hover', isInteractive);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isInitialized) {
        currentX = targetX;
        currentY = targetY;
        isInitialized = true;
      }

      if (!isVisible) {
        isVisible = true;
        container.classList.add('cursor-visible');
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      updateHoverState(e.target as HTMLElement | null);
    };

    const onMouseEnter = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isInitialized) {
        currentX = targetX;
        currentY = targetY;
        isInitialized = true;
      }

      isVisible = true;
      container.classList.add('cursor-visible');
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      updateHoverState(e.target as HTMLElement | null);
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.classList.remove('cursor-visible');
      container.classList.remove('cursor-hover');
    };

    const onScroll = () => {
      if (!isVisible) return;
      const el = document.elementFromPoint(targetX, targetY) as HTMLElement | null;
      updateHoverState(el);
    };

    const renderLoop = (now: number) => {
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;

      if (isInitialized) {
        // Frame-rate independent smooth lerp (~0.18 factor at 60fps)
        const lerpFactor = 1 - Math.pow(1 - 0.18, delta / 16.667);
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;

        // Snap to target if sub-pixel delta is negligible to prevent micro jitter
        if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05) {
          currentX = targetX;
          currentY = targetY;
        }

        ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('blur', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('blur', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="custom-cursor-container" aria-hidden="true">
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </div>
  );
};
