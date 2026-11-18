# AGENTS.md — Scroll-animation portfolio

## How to use this file

Place this file at the root of the portfolio project, next to `package.json`. Antigravity loads `AGENTS.md` automatically on every turn, so the user does not need to ask you to refer to it.

Follow this file for all animation work in this project. If a request conflicts with the wiring, cleanup, or accessibility rules below, follow the rules below and say so in your reply.

Optional split, only if this file grows too large:

- Keep this file short and always loaded.
- Move detailed scene specs to `.agents/rules/scroll-animations.md`.
- Move the full tools reference to `docs/scroll-animation-tools.md` and keep one line here pointing to it.
- Install agent skills under `.agents/skills/` — they load on demand, not on every turn.

## Project

A custom-coded portfolio with scroll-driven animation, modelled on the architecture in the Scroll Animations and Architecture Report for himanshukaushik.vercel.app. This is not a Framer or Webflow site. Build the same architecture, but use the project owner's own content and projects — do not copy another person's name, projects, or copy.

## Stack — use these versions

| Layer | Choice | Version / note |
|---|---|---|
| Framework | React | 19 |
| Language | TypeScript | Strict |
| Build tool | Vite | — |
| Styling | Tailwind CSS | v4 |
| Scroll animation | GSAP + ScrollTrigger | `gsap@3.15.1` |
| Smooth scroll | Lenis | `lenis@1.3.27` |
| 3D | Three.js | `three@0.187.0` |
| Types | `@types/three`, `@types/gsap` | Dev dependencies |
| Tests | Playwright | Scroll and frame-time checks |
| Fonts | Fontshare | Satoshi, Clash Display, Amulya |

Do not upgrade these versions, swap libraries, or add another animation library without asking first.

## Which tool is used for which purpose

| Tool | Purpose in this project | What it is not for |
|---|---|---|
| GSAP core | Timelines, easing, staggered reveals | Smooth scrolling on its own |
| GSAP ScrollTrigger | Pinning, scrubbing, scroll-linked progress, snap points | Page layout |
| GSAP Skills | Agent instructions so you use the GSAP API correctly | Runtime code — skills never ship to the browser |
| Lenis | Momentum smooth scroll, anchor handling, scroll position | Animating elements |
| Three.js | Procedural 3D keycap built with `BufferGeometry` | Loading a downloaded `.glb` model |
| React + `gsap.context()` | Owning and cleaning up every animation | Letting timelines survive unmount |
| Tailwind CSS v4 + `tokens.css` | Layout, design tokens, fluid type | Scroll animation logic |
| Playwright | Verifying scroll behaviour and frame time | Visual design |

GitHub sources, for reference only:

- GSAP library: https://github.com/greensock/GSAP
- GSAP Skills: https://github.com/greensock/gsap-skills
- Lenis: https://github.com/darkroomengineering/lenis
- Three.js: https://github.com/mrdoob/three.js

Do not clone the full Three.js repository into this project — it is about 2 GB. Install it with npm only.

## Install — run once, before building any scene

```bash
npx skills add https://github.com/greensock/gsap-skills --agent antigravity
npm install gsap@3.15.1 lenis@1.3.27 three@0.187.0
npm install -D @types/three @types/gsap
```

Skills needed: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`.

If the skills command fails, clone shallow and copy the skills into `.agents/skills/`:

```bash
git clone --depth=1 https://github.com/greensock/gsap-skills.git
```

If a Vite + React 19 + TypeScript + Tailwind v4 project already exists, keep it and do not overwrite the owner's content. If none exists, create one first, then install the stack above.

## Motion scaffold — create these three files first

- `src/motion/gsap.ts` — Import `gsap` and `ScrollTrigger`, register ScrollTrigger once, with `ignoreMobileResize: true`.

- `src/motion/lenis.ts` — Create Lenis and connect it to GSAP. This wiring is not optional.

- `src/motion/useGsap.ts` — A React hook `useGsap(setup, scope, deps)` that wraps the setup in `gsap.context()` so pins, timelines, and listeners are cleaned up on unmount and under React StrictMode.

Wire Lenis and GSAP in `App.tsx` or the main entry. Do not build hero, About, or Works sections until this scaffold exists and the build passes.

## Core wiring rules — never change these

- Create Lenis with `lerp: 0.08`, `smoothWheel: true`, `wheelMultiplier: 0.9`, `anchors: true`.
- On Lenis scroll, call `ScrollTrigger.update`.
- Drive Lenis through `gsap.ticker` — call `lenis.raf(time * 1000)` there. Do not start a second `requestAnimationFrame` loop for Lenis.
- Set `gsap.ticker.lagSmoothing(0)`.
- Put every timeline, pin, and ScrollTrigger inside `gsap.context()` through the `useGsap` hook, and revert the context on cleanup.
- Register ScrollTrigger once, in `src/motion/gsap.ts` only.

If an animation jitters, jumps, or desyncs, check these four things first: Lenis is driven by `gsap.ticker`, `lagSmoothing` is `0`, `ScrollTrigger.update` is called on Lenis scroll, and all timelines are inside `gsap.context()` with cleanup.

## Design tokens

- Palette: stone paper background, ink text, coral accent `#ff5a3d`.
- Define tokens in `tokens.css`. Do not hard-code colours or spacing ad hoc in components.
- Use fluid type with `clamp()` for headings and display text.
- Fonts: Satoshi for body, Clash Display for display, Amulya where the design calls for it — loaded from Fontshare.

## Scene specs — build one at a time, in this order

### 1. Hero iris reveal

Dark intro over the light hero, pinned for 1.5x screen height. Animate a radial-gradient mask from `--reveal-radius: 0px` to the screen diagonal. Title characters then stagger up from `yPercent: 118`, `rotate: 3` to `0`.

### 2. About curtain wipe and parallax

Text lines sit in `overflow: hidden` wrappers and slide from `yPercent: 110` to `0`, ease `power4.out`, trigger at `top 78%`. The image is revealed with `clip-path: inset(0 0 100% 0)` to `inset(0 0 0% 0)`, then scrubbed parallax from `yPercent: -2%` to `2%`.

### 3. Self-drawing SVG waves

For the closing / Let's Build section, generate SVG cubic Bézier paths between words in code. Scrub `strokeDashoffset` from the full path length to `0` with ScrollTrigger. Do not hand-draw a static path and fade it in.

### 4. Works gallery with snap

Pinned gallery. Snap to stops `[0, 0.33, 0.66, 1.0]`, snap duration minimum `0.18` and maximum `0.45`, ease `power2.inOut`. On project change, crossfade the title directionally, and drive a progress bar with `scaleX` from `0` to `1`.

### 5. Rounded video board

Present video inside a rounded board that follows the same pin and scrub patterns as the other scenes. Keep the board's motion on GSAP, not on CSS transitions.

### 6. Procedural 3D keycap

Build the keycap procedurally in Three.js with `BufferGeometry` — there is no model file. Use `RoomEnvironment` lighting. Render on demand only, not on a continuous loop. Press and hover states depress the keycap.

After these: page-transition bands and the menu overlay, using the same scaffold.

## How the user will ask you to implement a tool

The user will name one scene at a time, with a file and numbers — for example: "In `Works.tsx`, pin: true, scrub: 0.8, snap to [0, 0.33, 0.66, 1.0]."

When that happens:

1. Use the tool named in the table above for that job — ScrollTrigger for scroll animation, Lenis for smooth scroll, Three.js for 3D.
2. Build only that scene. Do not build the next scene in the same turn.
3. Keep all animation code inside the `useGsap` hook for that component.
4. Stop, report what changed, and let the user test it in preview before continuing.

If the user only says "make it animated", ask which scene and which numbers, or propose the next scene from the list above with its numbers and wait for a go-ahead. Do not invent a whole page of animations from a vague prompt.

## Do not

- Do not build the complete site from one big prompt.
- Do not replace GSAP or ScrollTrigger with CSS animations, IntersectionObserver, or another library for the scenes above.
- Do not create ScrollTriggers outside `gsap.context()`.
- Do not run Lenis on its own animation loop alongside `gsap.ticker`.
- Do not clone the full GSAP or Three.js repositories into the project — npm installs and the GSAP Skills are enough.
- Do not render Three.js continuously when nothing is moving.
- Do not overwrite the owner's existing content, projects, or copy when setting up the stack.

## Accessibility and performance

- Respect `prefers-reduced-motion`: disable pinning, scrubbing, and smooth scroll effects and show the final state.
- Every scroll-driven scene must remain usable by keyboard and without smooth scrolling.
- Target a 95th-percentile frame time under 16.6 ms during scroll, checked with Playwright.
- Prefer animating `transform` and `opacity`. Avoid animating layout properties in scrubbed timelines.

## Verify before saying a scene is done

- `npm run build` passes with no errors.
- The dev server loads the page with no console errors.
- The scene works on scroll down and scroll back up, and survives a remount under StrictMode with no duplicate pins.
- Reduced-motion mode shows readable content with no hidden text.
- Report back: the updated `package.json` dependencies (after setup), the files created or changed, and the build result.

