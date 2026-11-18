import { useMaskHover } from './useMaskHover'

/**
 * Helmet reveal — the site's closing visual (Framer "Hover Mask
 * Reveal" recreated). Arnav's portrait (public/portrait.png,
 * 1011×634 cut-out) with the McLaren helmet composite
 * (public/helmet.webp, 1800×1200) stacked over it. A circular
 * mask follows the cursor (with lag, via useMaskHover) and reveals
 * the helmet only inside the circle — everywhere else the
 * portrait stays.
 *
 * Alignment: the composite is the same photo with the helmet
 * pasted on — portrait pixel (x, y) maps to composite pixel
 * (2x − 105, 2y − 61), verified with a 50% blend check (the
 * glasses sit in the visor, the fleece coincides). In a container
 * of the portrait's aspect (1011:634) the helmet layer is
 * therefore 89.02% wide, at left 5.19%, top 4.81%.
 *
 * The masked layer is a full-frame div (so the mask coordinates
 * from the hook line up exactly); the helmet image inside it
 * carries the alignment transform. Touch / reduced-motion: the
 * masked layer stays hidden and the portrait stands alone.
 */
export default function HelmetReveal() {
  const frameRef = useMaskHover<HTMLDivElement>()

  return (
    <figure className="mx-auto w-full max-w-2xl">
      <div
        ref={frameRef}
        className="relative aspect-[1011/634] w-full overflow-hidden rounded-2xl bg-paper"
      >
        <img
          src="/portrait.png"
          alt="Arnav Yadav"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
        />
        <div aria-hidden="true" className="mask-reveal absolute inset-0">
          <img
            src="/helmet.webp"
            alt=""
            draggable={false}
            className="absolute select-none"
            style={{ width: '89.02%', left: '5.19%', top: '4.81%' }}
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.25em] text-ink-soft uppercase">
        Move to reveal
      </figcaption>
    </figure>
  )
}
