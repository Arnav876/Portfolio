import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

// Prevent mobile address-bar resize jumps from recalculating pinned scenes
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
