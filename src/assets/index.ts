import homepage from './homepage-media.json'
import { assetUrl } from './paths'
import { getSimulationThumbnail, simulationMedia } from './simulations'
import type { ImageAsset } from './types'

export { assetUrl } from './paths'
export { getSimulationThumbnail, getSimulationScene, simulationMedia } from './simulations'
export type { ImageAsset, SceneImage, SimulationMedia } from './types'

/** Stable semantic keys keep components independent of asset folder layouts. */
export const imageRegistry: Partial<Record<string, ImageAsset>> = {}

for (const [name, metadata] of Object.entries(homepage)) {
  imageRegistry[`home.${name}`] = {
    ...metadata,
    src: assetUrl(`images/homepage/${name}.webp`),
    srcSet: `${assetUrl(`images/homepage/${name}-800.webp`)} 800w, ${assetUrl(`images/homepage/${name}.webp`)} ${metadata.width}w`,
  }
}
for (const slug of Object.keys(simulationMedia)) {
  imageRegistry[`simulation.${slug}`] = getSimulationThumbnail(slug)
}
