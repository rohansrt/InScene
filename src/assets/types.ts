/** Files are relative to public/, without a leading slash. */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
}

/** Scene files live inside their simulation's scenes/ directory. */
export interface SceneImage {
  file: string
  alt: string
  width: number
  height: number
}

export interface SimulationMedia {
  thumbnail: Omit<ImageAsset, 'src' | 'srcSet'>
  scenes: Record<string, SceneImage>
}
