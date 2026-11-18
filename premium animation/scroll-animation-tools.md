# Scroll-animation tools — full map

Save this file as `docs/scroll-animation-tools.md` in the portfolio project. `AGENTS.md` points here for detail. This file is reference — it is not loaded automatically on every turn, so keep the critical rules in `AGENTS.md`.

## The three layers

| Layer | Where it lives | When it loads | Job |
|---|---|---|---|
| Rules | `AGENTS.md` at project root | Every turn, automatically | Stack, versions, wiring, do-nots |
| Skills | `.agents/skills/` | On demand, when relevant | Correct GSAP API patterns for the agent |
| Libraries | `package.json` via npm | At runtime in the browser | The code that actually animates |

A loose reference file on its own does not work — if the user has to remember to mention it each time, the agent will forget it. That is why the rules live in `AGENTS.md` and this file is only the detail behind them.

## Tools by purpose

### GSAP — animation engine

- Repo: https://github.com/greensock/GSAP
- Install: `npm install gsap@3.15.1`
- Used for: timelines, easing, staggers, character reveals, crossfades, progress bars.
- Core pattern: build timelines inside `gsap.context()` through the `useGsap` hook.

### GSAP ScrollTrigger — scroll animation

- Part of GSAP, registered once in `src/motion/gsap.ts` with `ignoreMobileResize: true`.
- Used for: pinning scenes, scrubbing progress to scroll, snap points, parallax, curtain reveals, SVG draw-on.
- Key values in this project: hero pin 1.5x screen height, About trigger `top 78%`, Works snap stops `[0, 0.33, 0.66, 1.0]`.

### GSAP Skills — instructions for Antigravity

- Repo: https://github.com/greensock/gsap-skills
- Install: `npx skills add https://github.com/greensock/gsap-skills --agent antigravity`
- Skills: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`.
- Used for: stopping the agent guessing the API — correct pin, scrub, cleanup, and React patterns.
- These are not runtime code and never ship to the browser.

### Lenis — smooth scroll

- Repo: https://github.com/darkroomengineering/lenis
- Install: `npm install lenis@1.3.27`
- Used for: momentum smooth scrolling and anchor handling — the feel underneath every scene.
- There is no official Antigravity skill for Lenis, so its wiring is written out in `AGENTS.md` instead: `lerp: 0.08`, `smoothWheel: true`, `wheelMultiplier: 0.9`, `anchors: true`, driven by `gsap.ticker`, with `ScrollTrigger.update` on scroll.

### Three.js — 3D keycap

- Repo: https://github.com/mrdoob/three.js
- Install: `npm install three@0.187.0` and `npm install -D @types/three`
- Used for: one procedural 3D keycap built with `BufferGeometry` and `RoomEnvironment` lighting, rendered on demand.
- Not used for: loading model files. There is no `.glb` in this design. Do not clone the full repo into the project.

### Supporting tools — npm or services, not GitHub clones

- Vite + React 19 + TypeScript: the app itself.
- Tailwind CSS v4: layout and tokens, with tokens defined in `tokens.css`.
- Fontshare: Satoshi, Clash Display, and Amulya fonts.
- Playwright: automated scroll checks and frame-time testing, targeting a 95th-percentile frame time under 16.6 ms.

## Which tool for a new request

- "Animate this on scroll" — GSAP ScrollTrigger.
- "Make scrolling feel smooth" — Lenis. Check the wiring before adding anything.
- "Add a 3D element" — Three.js, procedural geometry, on-demand rendering.
- "The agent keeps writing GSAP wrong" — GSAP Skills in `.agents/skills/`, not more prompting.
- "This looks off / jumps" — wiring checklist in `AGENTS.md`: ticker, `lagSmoothing(0)`, `ScrollTrigger.update`, `gsap.context()` cleanup.
