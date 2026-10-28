/**
 * Registry of finished artwork, keyed by the semantic image keys used across the site
 * (see docs/image-manifest.json). Any key without an entry renders the branded
 * placeholder at the same aspect ratio, so adding artwork never changes layout.
 *
 * Example entry once an illustration exists:
 *   'simulation.fair-exam-march': {
 *     src: `${import.meta.env.BASE_URL}images/simulations/fair-exam-march.webp`,
 *     alt: 'Officer speaking calmly with a student organiser at a peaceful march',
 *     width: 1600,
 *     height: 900,
 *   },
 */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
}

export const imageRegistry: Partial<Record<string, ImageAsset>> = {}
