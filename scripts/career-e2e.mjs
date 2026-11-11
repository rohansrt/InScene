// Plays the whole Career Simulator journey end to end and captures screenshots.
// Usage: npm run dev (or preview) &  then  BASE_URL=http://localhost:5173 node scripts/career-e2e.mjs
// Env: BASE_URL (default http://localhost:5173), LEVEL (explorer|investigator|planner|pro), VIEWPORT=mobile, SHOTS=0
import { chromium } from 'playwright'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const LEVEL = process.env.LEVEL ?? 'investigator'
const MOBILE = process.env.VIEWPORT === 'mobile'
const SHOTS = process.env.SHOTS !== '0'
const DIR = join('qa-artifacts', 'career')
mkdirSync(DIR, { recursive: true })
const errors = []

function findChromium() {
  if (process.env.PW_CHROMIUM_PATH) return process.env.PW_CHROMIUM_PATH
  const cache = join(homedir(), 'Library/Caches/ms-playwright')
  if (!existsSync(cache)) return undefined
  const dir = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop()
  return dir ? join(cache, dir, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell') : undefined
}

// Prefer the installed Chrome so the run matches what students use (newer engines change DOM APIs,
// e.g. scrollIntoView now returns a Promise); fall back to Playwright's bundled builds.
const browser = await chromium
  .launch({ channel: 'chrome' })
  .catch(() => chromium.launch())
  .catch(() => chromium.launch({ executablePath: findChromium() }))
const page = await browser.newPage(MOBILE ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 860 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(e.message))
page.on('dialog', (d) => d.accept())

const tag = `${MOBILE ? 'mobile' : 'desktop'}-${LEVEL}`
let n = 0
async function shot(name) {
  if (!SHOTS) return
  await page.waitForTimeout(450)
  await page.screenshot({ path: join(DIR, `${tag}-${String(++n).padStart(2, '0')}-${name}.png`), fullPage: true })
}
const click = (sel) => page.locator(sel).first().click()
const tid = (id) => click(`[data-testid="${id}"]`)
async function stage(s) {
  await page.waitForSelector(`[data-testid="career-journey"][data-stage="${s}"]`, { timeout: 8000 })
}
async function sim(s) {
  await page.waitForSelector(`[data-testid="career-mission"][data-stage="${s}"]`, { timeout: 8000 })
}
async function step(s) {
  await page.waitForSelector(`[data-testid="mission"][data-step="${s}"]`, { timeout: 8000 })
}

await page.goto(`${BASE}/career`)
await page.evaluate(() => localStorage.clear())
await page.reload()
await shot('home')
// Simulations stay locked until the core profile is done.
await page.goto(`${BASE}/career/rain-ready`)
await stage('welcome')
await page.goto(`${BASE}/career`)
await page.waitForSelector('[data-testid="career-home"][data-core="todo"]')
await tid('career-start')
await stage('welcome')
await page.fill('[data-testid="nickname"]', 'Asha')
await tid(`level-${LEVEL}`)
await shot('welcome')
await tid('welcome-go')

// Quick Start
await stage('quickstart')
for (let i = 0; i < 9; i++) {
  if (i === 2) await shot('this-or-that')
  await tid(`tot-${i % 3 === 0 ? 1 : 0}`)
  await page.waitForTimeout(120)
}
await shot('interlude')
await tid('interlude-next')
const pattern = ['love', 'nah', 'love', 'never', 'maybe', 'love', 'nah', 'love', 'never', 'maybe', 'love', 'love']
for (let i = 0; i < 12; i++) {
  if (i === 1) await shot('cards')
  await tid(`react-${pattern[i]}`)
  await page.waitForTimeout(330)
  if (await page.locator('[data-testid="myth"]').count()) {
    if (i === 3) await shot('myth')
    await tid('myth-myth')
    await tid('myth-next')
    await page.waitForTimeout(150)
  }
}
await tid('interlude-next')
for (const v of ['discovery', 'impact', 'creativity']) await tid(`value-${v}`)
await shot('values')
await tid('values-next')
await page.getByRole('button', { name: /Tech & Data/ }).click()
await page.getByRole('button', { name: /Health & Care/ }).click()
await shot('heard')
await tid('heard-next')
const pills = page.locator('[data-testid="ahead-round"] button[aria-pressed]')
for (let i = 0; i < Math.min(3, await pills.count()); i++) await pills.nth(i * 2).click()
await shot('ahead')
await tid('ahead-next')

// Core results: the first stamp, then a free choice of simulation
await stage('reveal')
await page.waitForSelector('[data-stamp="core"][data-earned="true"]')
if (await page.locator('[data-stamp="rain-ready"][data-earned="true"]').count()) throw new Error('Rain Ready stamped before it was played')
await shot('reveal')
await tid('wildcard')
await shot('reveal-wildcard')
await page.locator('[data-testid="simulation-picker"]').scrollIntoViewIfNeeded()
await shot('reveal-picker')
// The core is complete on its own: home now shows the Passport and the picker.
await page.goto(`${BASE}/career`)
await page.waitForSelector('[data-testid="career-home"][data-core="done"]')
await page.waitForSelector('[data-testid="profile-snapshot"]')
await shot('home-core-done')
await tid('play-rain-ready')
await sim('team')
await shot('team')
await tid('team-next')

// Mission
await sim('mission')
await step('brief'); await shot('brief'); await tid('mission-next')
await step('intro:scientist'); await shot('intro-scientist'); await tid('mission-next')
await step('hotspots')
for (const name of ['Market Road dip', 'Lake View Lane', 'Ward park']) await page.getByRole('checkbox', { name: new RegExp(name) }).click()
await tid('mission-submit'); await shot('hotspots-feedback'); await tid('mission-next')
await step('evidence')
await page.getByRole('checkbox', { name: /Drain camera/ }).click()
await page.getByRole('checkbox', { name: /Old vs new maps/ }).click()
await tid('mission-submit'); await tid('mission-next')
await step('cause')
await page.getByRole('radio', { name: /A mix of reasons/ }).click()
await tid('mission-submit'); await shot('cause-feedback'); await tid('mission-next')
await step('mood:scientist'); await tid('mood-love'); await shot('mood'); await tid('mission-next')
await step('intro:planner'); await tid('mission-next')
await step('residents')
for (const r of ['salim', 'lakshmi', 'kamla', 'ravi']) await tid(`resident-${r}`)
await shot('residents'); await tid('mission-next')
await step('rank')
for (const r of ['kamla', 'lakshmi', 'salim', 'ravi']) await tid(`rank-${r}`)
await tid('mission-submit'); await shot('rank-feedback'); await tid('mission-next')
await step('salim')
await page.getByRole('radio', { name: /Work at night/ }).click()
await tid('mission-submit'); await tid('mission-next')
await step('mood:planner'); await tid('mood-hard'); await tid('mission-next')
await step('intro:engineer'); await tid('mission-next')
await step('fixes')
for (const f of ['fix-desilt', 'fix-lakePond', 'fix-alerts']) await tid(f)
for (let i = 0; i < 4; i++) await tid('fix-pits-add')
await shot('fixes'); await tid('mission-submit'); await shot('fixes-feedback'); await tid('mission-next')
await step('calc')
const senior = LEVEL === 'planner' || LEVEL === 'pro'
await tid(`calc-${senior ? 100000 : 2000}`)
await page.waitForSelector('text=Not quite, try again!')
if (await page.locator('[data-testid="mission-next"]').count()) throw new Error('Calc moved on after a wrong answer')
await shot('calc-wrong')
await tid(`calc-${senior ? 90000 : 20000}`)
await shot('calc'); await tid('mission-next')
await step('mood:engineer'); await tid('mood-ok'); await tid('mission-next')
await step('replay'); await tid('storm'); await page.waitForTimeout(1200); await shot('storm'); await page.waitForTimeout(2600); await shot('replay'); await tid('mission-next')
await step('twist')
await page.getByRole('radio', { name: /send the bill/ }).click()
await shot('twist'); await tid('mission-submit'); await shot('twist-feedback'); await tid('mission-next')
await step('present')
if (await page.locator('[data-testid="present"] textarea, [data-testid="present"] input').count()) throw new Error('Present step asks the student to type')
await page.waitForSelector('[data-testid="present"][data-beat="2"]', { timeout: 8000 })
await shot('present-playing')
await page.waitForSelector('[data-testid="mission-next"]', { timeout: 15000 })
await shot('present'); await tid('mission-next')

// Reflect
await sim('reflect')
await tid('more-scientist-yes'); await tid('more-planner-maybe'); await tid('more-engineer-no')
await page.getByRole('button', { name: 'How much listening there is' }).click()
await shot('reflect'); await tid('reflect-next')

// Results (3 layers)
await sim('results')
await page.waitForTimeout(800)
await shot('results-snapshot')
await tid('commit-week')
await tid('to-why'); await shot('results-why')
await tid('to-deeper'); await shot('results-deeper')
await tid('open-passport')
await page.waitForSelector('[data-testid="passport"]')
await page.waitForSelector('[data-testid="passport-skills"]')
await shot('passport')

// Persistence: reload keeps results, the core profile and both stamps
await page.goto(`${BASE}/career/rain-ready`)
await sim('results')
await page.goto(`${BASE}/career/play`)
await stage('reveal')
await page.goto(`${BASE}/career`)
await page.waitForSelector('[data-stamp="rain-ready"][data-earned="true"]')
await shot('home-two-stamps')

// Saved journeys from the old combined flow (v1) carry over
const legacy = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('inscene.career.v1'))
  const { coreDoneAt, missionStage, missionDoneAt, ...rest } = s
  void coreDoneAt; void missionStage; void missionDoneAt
  return { ...rest, v: 1, stage: 'mission', mission: { ...rest.mission, step: 3 } }
})
await page.evaluate((v) => localStorage.setItem('inscene.career.v1', JSON.stringify(v)), legacy)
await page.goto(`${BASE}/career/rain-ready`)
await sim('mission')
await page.goto(`${BASE}/career/play`)
await stage('reveal')

await page.goto(`${BASE}/career/school`); await page.waitForSelector('[data-testid="school-view"]'); await shot('school')
await page.goto(`${BASE}/products?category=career`); await page.waitForSelector('[data-testid="catalog"][data-category="career"]'); await shot('catalog')
// Catalog breakdown: the Career Profile comes first and is the only card marked (required).
const firstCard = page.locator('[data-testid="simulation-card"]').first()
if ((await firstCard.getAttribute('data-slug')) !== 'career-discovery') throw new Error('Career Profile is not the first catalog card')
await firstCard.locator('[data-testid="career-step"][data-step="required"]').waitFor()
if ((await page.locator('[data-testid="career-step"]').count()) !== 1) throw new Error('Only the Career Profile card should carry a step badge')
if (await page.locator('[data-testid="simulation-card"]', { hasText: /optional/i }).count()) throw new Error('A catalog card says "optional"')
await page.locator('[data-testid="simulation-card"][data-slug="career-discovery"] button').click()
await page.waitForSelector('[data-testid="simulation-modal"]'); await shot('modal')
await tid('play-now')
await page.waitForURL(/\/career\/play$/)
await page.goto(`${BASE}/products?category=career`)
await page.locator('[data-testid="simulation-card"][data-slug="rain-ready"] button').click()
await page.waitForSelector('[data-testid="simulation-modal"][data-slug="rain-ready"]'); await shot('modal-rain-ready')
await tid('play-now')
await page.waitForURL(/\/career\/rain-ready$/)

await browser.close()
const summary = page.url
console.log(`Career journey (${tag}) completed. ${n} screenshots in ${DIR}.`)
if (errors.length) {
  console.log('Console errors:\n' + errors.map((e) => '  ' + e).join('\n'))
  process.exitCode = 1
}
void summary
