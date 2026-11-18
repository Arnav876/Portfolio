# Scroll animations — detailed rule

Save this file as `.agents/rules/scroll-animations.md` in the portfolio project. It carries the detailed scene specs behind `AGENTS.md`. Follow `AGENTS.md` for the stack, wiring, and cleanup rules that apply to every scene here.

## Order of work

Build scenes in this order, one per prompt, and verify each in preview before starting the next:

1. Motion scaffold — `gsap.ts`, `lenis.ts`, `useGsap.ts`
2. Hero iris reveal
3. About curtain wipe and parallax
4. Self-drawing SVG waves
5. Works gallery with snap
6. Rounded video board
7. Procedural 3D keycap
8. Page-transition bands and menu overlay
9. Reduced-motion and keyboard fallbacks, then Playwright scroll tests

## Scene specs

### Hero iris reveal

- Pin the dark intro over the light hero for 1.5x screen height.
- Animate a radial-gradient mask from `--reveal-radius: 0px` to the screen diagonal.
- Stagger title characters up from `yPercent: 118`, `rotate: 3` to `0`.

### About curtain wipe and parallax

- Wrap each text line in `overflow: hidden`; slide from `yPercent: 110` to `0`, ease `power4.out`, trigger at `top 78%`.
- Reveal the image with `clip-path: inset(0 0 100% 0)` to `inset(0 0 0% 0)`.
- Follow with scrubbed parallax, `yPercent: -2%` to `2%`.

### Self-drawing SVG waves

- Generate cubic Bézier paths between words in code.
- Scrub `strokeDashoffset` from the full path length to `0`.

### Works gallery

- Pin the gallery; snap to `[0, 0.33, 0.66, 1.0]`.
- Snap duration minimum `0.18`, maximum `0.45`, ease `power2.inOut`.
- Crossfade titles directionally on project change; progress bar `scaleX: 0` to `1`.

### Procedural 3D keycap

- Three.js `BufferGeometry` only — no model file.
- `RoomEnvironment` lighting, on-demand rendering only.
- Hover and press depress the keycap.

## Ready-to-paste prompts

Hero:

> Using GSAP ScrollTrigger and the useGsap hook, build the hero iris reveal. Dark intro pinned for 1.5x screen height, radial-gradient mask animating --reveal-radius from 0px to the screen diagonal. Title characters stagger up from yPercent: 118, rotate: 3 to 0. Respect prefers-reduced-motion.

About:

> Using ScrollTrigger, build the About reveal. Text lines in overflow:hidden wrappers slide yPercent: 110 to 0, ease power4.out, trigger top 78%. Image curtain clip-path inset(0 0 100% 0) to inset(0 0 0% 0), then scrubbed parallax yPercent -2% to 2%.

Works:

> Build the pinned Works gallery with ScrollTrigger. Snap to stops [0, 0.33, 0.66, 1.0], duration min 0.18 max 0.45, ease power2.inOut. Directional title crossfade on project change, and a scaleX progress bar 0 to 1.

Waves and keycap:

> For the Let's Build section, generate SVG cubic Bezier paths between words and scrub strokeDashoffset from length to 0. For the 3D keycap, use Three.js BufferGeometry procedurally — no .glb file — with RoomEnvironment lighting, render on-demand only.

Fixing jitter:

> The scroll animation is jittering. Check that Lenis is driven by gsap.ticker, lagSmoothing is 0, ScrollTrigger.update is called on Lenis scroll, and all timelines are inside gsap.context() with cleanup.

## Rules for every prompt

- One scene at a time — a single prompt for the whole site breaks pinning and cleanup.
- Always name the file and the numbers, for example `Works.tsx, pin: true, scrub: 0.8`.
- Test in preview after each scene before prompting for the next one.
