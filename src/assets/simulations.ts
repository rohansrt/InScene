import catalog from './simulation-media.json'
import { assetUrl } from './paths'
import type { ImageAsset, SimulationMedia } from './types'

export const simulationMedia: Record<string, SimulationMedia> = catalog

export function getSimulationThumbnail(slug: string): ImageAsset | undefined {
  const media = simulationMedia[slug]
  if (!media) return undefined
  const base = `images/simulations/${slug}`
  return {
    ...media.thumbnail,
    src: assetUrl(`${base}/thumbnail.webp`),
    srcSet: `${assetUrl(`${base}/thumbnail-800.webp`)} 800w, ${assetUrl(`${base}/thumbnail.webp`)} ${media.thumbnail.width}w`,
  }
}

/** Add named scene images to simulation-media.json as simulations grow. */
export function getSimulationScene(slug: string, sceneId: string): ImageAsset | undefined {
  const scene = simulationMedia[slug]?.scenes[sceneId]
  if (!scene) return undefined
  return {
    src: assetUrl(`images/simulations/${slug}/scenes/${scene.file}`),
    alt: scene.alt,
    width: scene.width,
    height: scene.height,
  }
}
