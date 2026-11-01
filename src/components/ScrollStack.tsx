import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollStackProps {
  children: React.ReactNode;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const childArray = React.Children.toArray(children);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const sections = gsap.utils.toArray<HTMLElement>('.scroll-stack-section', container);
      const cards = gsap.utils.toArray<HTMLElement>('.scroll-stack-card', container);
      const total = sections.length;

      if (total <= 1) return;

      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const mm = gsap.matchMedia();

      // =========================================================================
      // 1. DESKTOP BREAKPOINT (≥ 769px): Controlled Section-by-Section Deck Stacking
      // =========================================================================
      mm.add('(min-width: 769px)', () => {
        // Initial placement of cards: Hero active, incoming cards off-screen below
        sections.forEach((sec, idx) => {
          if (idx > 0) {
            gsap.set(sec, { yPercent: 100 });
          } else {
            gsap.set(sec, { yPercent: 0 });
          }
          gsap.set(cards[idx], {
            scale: 1,
            transformOrigin: 'top center',
            filter: 'brightness(1)'
          });
        });

        // Master scrubbed timeline pinned to container
        let lastStage = 0;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${(total - 1) * window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const currentStage = Math.round(self.progress * (total - 1));
              if (currentStage !== lastStage) {
                lastStage = currentStage;
                sound.playTelemetryScan();
              }
            }
          }
        });

        // Build sequential transitions for each card deck step
        for (let i = 0; i < total - 1; i++) {
          const nextSec = sections[i + 1];
          const currCard = cards[i];

          // Incoming section enters from bottom and covers completely
          tl.to(
            nextSec,
            {
              yPercent: 0,
              ease: 'none',
              duration: 1
            },
            i
          );

          // Current card shrinks towards top-center and recedes behind incoming section
          tl.to(
            currCard,
            {
              scale: 0.92,
              filter: 'brightness(0.65)',
              ease: 'none',
              duration: 1
            },
            i
          );
        }

        // -----------------------------------------------------------------------
        // GESTURE LOCK & STRICT ONE-GESTURE-PER-SECTION CONTROLLER
        // -----------------------------------------------------------------------
        let currentIndex = Math.max(0, Math.min(total - 1, Math.round(window.scrollY / window.innerHeight)));
        let isAnimating = false;
        let isWheelActive = false;
        let wheelIdleTimer: any = null;
        let activeTween: gsap.core.Tween | null = null;

        const unlockGesture = () => {
          const checkIdle = () => {
            if (isWheelActive) {
              setTimeout(checkIdle, 35);
            } else {
              isAnimating = false;
            }
          };
          // Safety timeout ensures user is never locked out indefinitely
          setTimeout(() => {
            isAnimating = false;
          }, 300);
          checkIdle();
        };

        const goToSection = (targetIndex: number) => {
          const clamped = Math.max(0, Math.min(total - 1, targetIndex));
          if (clamped === currentIndex && Math.abs(window.scrollY - clamped * window.innerHeight) < 2) {
            isAnimating = false;
            return;
          }

          isAnimating = true;
          currentIndex = clamped;

          const targetY = clamped * window.innerHeight;
          const scrollProxy = { y: window.scrollY };

          if (activeTween) {
            activeTween.kill();
          }

          activeTween = gsap.to(scrollProxy, {
            y: targetY,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: 'auto',
            onUpdate: () => {
              window.scrollTo({ top: scrollProxy.y, behavior: 'instant' });
            },
            onComplete: () => {
              activeTween = null;
              unlockGesture();
            }
          });
        };

        const handleWheel = (e: WheelEvent) => {
          if (window.innerWidth < 769) return;

          // Track that trackpad or mouse-wheel events are actively firing
          isWheelActive = true;
          clearTimeout(wheelIdleTimer);
          wheelIdleTimer = setTimeout(() => {
            isWheelActive = false;
          }, 180);

          // Intercept to prevent browser's native multi-section momentum jump
          e.preventDefault();

          // While an active transition runs, absorb and ignore momentum events
          if (isAnimating) return;

          // Filter out minute accidental twitches
          if (Math.abs(e.deltaY) < 14) return;

          if (e.deltaY > 0) {
            // Downward gesture -> Advance exactly 1 section
            if (currentIndex < total - 1) {
              goToSection(currentIndex + 1);
            }
          } else if (e.deltaY < 0) {
            // Upward gesture -> Retreat exactly 1 section
            if (currentIndex > 0) {
              goToSection(currentIndex - 1);
            }
          }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (window.innerWidth < 769) return;
          const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
          if (tag === 'input' || tag === 'textarea') return;

          if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            if (!isAnimating && currentIndex < total - 1) {
              goToSection(currentIndex + 1);
            }
          } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (!isAnimating && currentIndex > 0) {
              goToSection(currentIndex - 1);
            }
          }
        };

        const handleNativeScroll = () => {
          if (!isAnimating) {
            currentIndex = Math.max(0, Math.min(total - 1, Math.round(window.scrollY / window.innerHeight)));
          }
        };

        const handleCustomNavigate = (e: Event) => {
          const detail = (e as CustomEvent).detail;
          if (detail && typeof detail.index === 'number') {
            goToSection(detail.index);
          }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleNativeScroll, { passive: true });
        window.addEventListener('portfolio-navigate', handleCustomNavigate);

        return () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('scroll', handleNativeScroll);
          window.removeEventListener('portfolio-navigate', handleCustomNavigate);
          clearTimeout(wheelIdleTimer);
          if (activeTween) activeTween.kill();
        };
      });

      // =========================================================================
      // 2. MOBILE BREAKPOINT (≤ 768px): Normal Vertical Flow
      // =========================================================================
      mm.add('(max-width: 768px)', () => {
        gsap.set(sections, { clearProps: 'all' });
        gsap.set(cards, { clearProps: 'all' });
      });

      // =========================================================================
      // 3. ACCESSIBILITY: Prefers-reduced-motion
      // =========================================================================
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(sections, { clearProps: 'all' });
        gsap.set(cards, { clearProps: 'all' });
      });
    },
    { scope: containerRef, dependencies: [children], revertOnUpdate: true }
  );

  return (
    <div ref={containerRef} className="scroll-stack-container">
      {childArray.map((child, idx) => (
        <div
          key={idx}
          className="scroll-stack-section"
          data-index={idx}
          style={{
            zIndex: (idx + 1) * 10
          }}
        >
          <div className="scroll-stack-card">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
