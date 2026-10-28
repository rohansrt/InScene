// Validate media before publishing: missing files otherwise become silent browser 404s.
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, relative } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const publicRoot = resolve(root, 'public')
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const catalog = readJson('src/assets/simulation-media.json')
const homepage = readJson('src/assets/homepage-media.json')
let count = 0
function checkFile(path) {
  const absolute = resolve(publicRoot, path)
  assert(!relative(publicRoot, absolute).startsWith('..'), `Asset escapes public/: ${path}`)
  assert(existsSync(absolute), `Missing asset: ${path}`)
  count++
}
function checkMetadata(metadata, label) {
  assert(metadata.alt?.trim(), `Missing alt text: ${label}`)
  assert(metadata.width > 0 && metadata.height > 0, `Invalid dimensions: ${label}`)
}
for (const [slug, media] of Object.entries(catalog)) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), `Invalid simulation slug: ${slug}`)
  checkMetadata(media.thumbnail, slug)
  for (const file of ['thumbnail.webp', 'thumbnail-800.webp']) checkFile(`images/simulations/${slug}/${file}`)
  for (const [id, scene] of Object.entries(media.scenes)) {
    checkMetadata(scene, `${slug}/${id}`)
    assert(/^[a-z0-9][a-z0-9.-]*\.webp$/.test(scene.file), `Invalid scene filename: ${scene.file}`)
    checkFile(`images/simulations/${slug}/scenes/${scene.file}`)
  }
}
for (const [name, metadata] of Object.entries(homepage)) {
  checkMetadata(metadata, name)
  checkFile(`images/homepage/${name}.webp`)
  checkFile(`images/homepage/${name}-800.webp`)
}
for (const file of ['src/data/simulations/police.ts', 'src/data/simulations/school.ts']) {
  const content = readFileSync(resolve(root, file), 'utf8')
  for (const match of content.matchAll(/imageKey: 'simulation\.([^']+)'/g)) {
    assert(catalog[match[1]], `Unregistered simulation image: ${match[1]}`)
  }
}
for (const name of ['enter-scenario', 'make-decisions', 'experience-outcomes', 'reflect-improve']) checkFile(`images/how-it-works/${name}.webp`)
for (const name of ['amit-kumar', 'rohan-saraswat']) checkFile(`images/founders/${name}.webp`)
function checkDuplicates(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    assert(!/ \d+\.[^.]+$/.test(entry.name), `Duplicate-style asset filename: ${entry.name}`)
    if (entry.isDirectory()) checkDuplicates(resolve(dir, entry.name))
  }
}
checkDuplicates(resolve(publicRoot, 'images'))
console.log(`Validated ${count} media files across ${Object.keys(catalog).length} simulations.`)
