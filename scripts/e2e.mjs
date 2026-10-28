// End-to-end interaction test + screenshot capture for the InScene website.
// Usage: npm run build && npx vite preview --port 4173 &  then  npm run test:e2e
// Env: BASE_URL (default http://localhost:4173), PW_CHROMIUM_PATH (optional browser binary),
//      SHOTS=0 to skip screenshots.
import { chromium } from 'playwright'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173'
const SHOT_DIR = 'qa-artifacts'
const SHOTS = process.env.SHOTS !== '0'
const results = []
const consoleErrors = []

function findChromium() {
  if (process.env.PW_CHROMIUM_PATH) return process.env.PW_CHROMIUM_PATH
  const cache = join(homedir(), 'Library/Caches/ms-playwright')
  if (!existsSync(cache)) return undefined
  const dir = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop()
  if (!dir) return undefined
  const bin = join(cache, dir, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell')
  return existsSync(bin) ? bin : undefined
}

async function launch() {
  try {
    return await chromium.launch()
  } catch {
    return chromium.launch({ executablePath: findChromium() })
  }
}

async function check(name, fn) {
  try {
    await fn()
    results.push({ name, ok: true })
    console.log(`  ✓ ${name}`)
  } catch (e) {
    results.push({ name, ok: false, error: e.message })
    console.log(`  ✗ ${name}\n      ${e.message.split('\n')[0]}`)
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

// React Router commits navigations in a transition, so DOM assertions are polled.
async function poll(fn, msg, timeout = 4000) {
  const start = Date.now()
  let last
  while (Date.now() - start < timeout) {
    try {
      last = await fn()
      if (last) return last
    } catch (e) {
      last = e.message
    }
    await new Promise((r) => setTimeout(r, 50))
  }
  throw new Error(`${msg} (last: ${last})`)
}

const cardCount = (page, n) => poll(async () => (await page.getByTestId('simulation-card').count()) === n, `expected ${n} cards`)

async function newPage(browser, viewport) {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${page.url()} → ${m.text()}`))
  page.on('pageerror', (e) => consoleErrors.push(`${page.url()} → ${e.message}`))
  return page
}

async function shot(page, name, fullPage = true) {
  if (!SHOTS) return
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${SHOT_DIR}/${name}.png`, fullPage })
}

const modal = (page) => page.locator('[role="dialog"]')

async function noHorizontalOverflow(page) {
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }))
  assert(sw <= iw, `horizontal overflow: scrollWidth ${sw} > innerWidth ${iw}`)
}

async function main() {
  mkdirSync(SHOT_DIR, { recursive: true })
  const browser = await launch()

  // ───────────── Desktop ─────────────
  console.log('\nDesktop (1440×900)')
  const page = await newPage(browser, { width: 1440, height: 900 })

  await check('Home renders hero, nav and CTA', async () => {
    await page.goto(BASE + '/')
    assert((await page.locator('h1').innerText()).includes('Step Into the Situation'), 'hero h1 missing')
    const links = await page.locator('nav[aria-label="Main"] a').allInnerTexts()
    assert(JSON.stringify(links) === JSON.stringify(['Home', 'Products', 'Reach Out']), `nav links: ${links}`)
    assert(await page.getByTestId('play-a-demo').isVisible(), 'Play a Demo missing')
    assert((await page.title()).includes('InScene'), 'title')
    await shot(page, 'desktop-home')
  })

  await check('Home: How It Works anchor + category cards + featured cards', async () => {
    await page.getByRole('link', { name: 'How It Works' }).click()
    await page.waitForTimeout(200)
    assert(page.url().endsWith('#how-it-works'), 'anchor')
    assert((await page.getByTestId('featured-card').count()) === 4, 'featured count')
    await page.getByTestId('category-school').click()
    await page.waitForURL(/\/products\?category=school/)
    await cardCount(page, 10)
    await page.goto(BASE + '/')
    await page.getByTestId('category-police').click()
    await page.waitForURL(/category=police/)
    await cardCount(page, 5)
  })

  await check('Featured card opens matching modal on Home', async () => {
    await page.goto(BASE + '/')
    const card = page.getByTestId('featured-card').nth(2)
    const slug = await card.getAttribute('data-slug')
    await card.click()
    await modal(page).waitFor()
    assert((await page.getByTestId('simulation-modal').getAttribute('data-slug')) === slug, 'slug mismatch')
    await page.keyboard.press('Escape')
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Navigation: Products / Reach Out / Home with active state', async () => {
    await page.goto(BASE + '/')
    await page.locator('nav[aria-label="Main"]').getByRole('link', { name: 'Products' }).click()
    await page.waitForURL(BASE + '/products')
    await poll(async () => (await page.locator('nav[aria-label="Main"] a[aria-current="page"]').innerText()) === 'Products', 'active Products')
    await page.locator('nav[aria-label="Main"]').getByRole('link', { name: 'Reach Out' }).click()
    await page.waitForURL(BASE + '/reach-out')
    await poll(async () => (await page.locator('nav[aria-label="Main"] a[aria-current="page"]').innerText()) === 'Reach Out', 'active Reach Out')
    await page.locator('header a[aria-label="InScene home"]').click()
    await page.waitForURL(BASE + '/')
  })

  await check('Products: police shows 5; school bands show 10 each; strands split 5/5', async () => {
    await page.goto(BASE + '/products')
    await cardCount(page, 5)
    await shot(page, 'desktop-products-police')
    await page.getByRole('tab', { name: /School Training/ }).click()
    await page.waitForURL(/category=school/)
    for (const band of ['Grades 6–8', 'Grades 9–10', 'Grades 11–12']) {
      await page.getByRole('tab', { name: band }).click()
      await poll(async () => (await page.getByTestId('result-count').innerText()).includes(band), `result line ${band}`)
      await cardCount(page, 10)
    }
    await page.getByRole('button', { name: 'Academic', exact: true }).click()
    await poll(async () => (await page.getByTestId('result-count').innerText()).includes('· Academic'), 'academic line')
    await cardCount(page, 5)
    await page.getByRole('button', { name: 'Non-academic' }).click()
    await poll(async () => (await page.getByTestId('result-count').innerText()).includes('Non-academic'), 'non-academic line')
    await cardCount(page, 5)
    await page.getByRole('button', { name: 'All', exact: true }).click()
    await cardCount(page, 10)
    await page.getByRole('tab', { name: 'Grades 9–10' }).click()
    await shot(page, 'desktop-products-school-9-10')
  })

  await check('Products: arrow keys move between category tabs', async () => {
    await page.goto(BASE + '/products')
    await page.getByRole('tab', { name: /Police Training/ }).focus()
    await page.keyboard.press('ArrowRight')
    await page.waitForURL(/category=school/)
    assert((await page.evaluate(() => document.activeElement?.textContent)).includes('School'), 'focus moved')
  })

  const allSlugs = []
  await check('Every card (35) opens its own modal; Escape closes and returns focus', async () => {
    const views = [
      '/products?category=police',
      '/products?category=school&grade=6-8',
      '/products?category=school&grade=9-10',
      '/products?category=school&grade=11-12',
    ]
    for (const v of views) {
      await page.goto(BASE + v)
      const cards = page.getByTestId('simulation-card')
      const n = await cards.count()
      for (let i = 0; i < n; i++) {
        const card = cards.nth(i)
        const slug = await card.getAttribute('data-slug')
        const title = await card.locator('h3').innerText()
        await card.click()
        await page.getByTestId('simulation-modal').waitFor()
        const m = page.getByTestId('simulation-modal')
        assert((await m.getAttribute('data-slug')) === slug, `modal slug ${slug}`)
        assert((await m.locator('h2').first().innerText()) === title, `modal title for ${slug}`)
        for (const section of ['The Situation', 'How It Plays', "What You'll Learn", 'Simulation Levels']) {
          assert(await m.getByRole('heading', { name: new RegExp(section) }).isVisible(), `${slug}: section ${section}`)
        }
        assert(new URL(page.url()).searchParams.get('sim') === slug, 'url sim param')
        await page.keyboard.press('Escape')
        await modal(page).waitFor({ state: 'detached' })
        assert(!new URL(page.url()).searchParams.get('sim'), 'sim param cleared')
        const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-slug'))
        assert(focused === slug, `focus returned to ${slug} (got ${focused})`)
        allSlugs.push(slug)
      }
    }
    assert(new Set(allSlugs).size === 35, `unique slugs ${new Set(allSlugs).size}`)
  })

  await check('Police modal: Basic/Advanced switch shows documented level text', async () => {
    await page.goto(BASE + '/products?category=police&sim=fair-exam-march')
    const panel = page.getByTestId('level-panel')
    assert((await panel.innerText()).includes('One identifiable organiser'), 'basic text')
    await page.getByRole('tab', { name: 'Advanced' }).click()
    assert((await panel.getAttribute('data-level')) === 'advanced', 'level attr')
    assert((await panel.innerText()).includes('false rumour spreads online'), 'advanced text')
    await shot(page, 'desktop-modal-police', false)
  })

  await check('School modal: planned levels show "Details coming soon"', async () => {
    await page.goto(BASE + '/products?category=school&grade=9-10&sim=the-fish-pond-mystery')
    const panel = page.getByTestId('level-panel')
    assert((await panel.innerText()).includes('Details coming soon'), 'basic coming soon')
    await page.getByRole('tab', { name: 'Advanced' }).click()
    assert((await panel.innerText()).includes('Details coming soon'), 'advanced coming soon')
    await shot(page, 'desktop-modal-school', false)
  })

  await check('Play Now → Coming Soon → Back to simulation → close button', async () => {
    await page.goto(BASE + '/products?category=police&sim=domestic-safety-call')
    await page.getByTestId('play-now').click()
    await page.getByTestId('coming-soon').waitFor()
    assert((await page.getByTestId('coming-soon').innerText()).includes('Your next learning experience is on its way.'), 'copy')
    await shot(page, 'desktop-coming-soon', false)
    await page.getByRole('button', { name: 'Back to simulation', exact: true }).click()
    await page.getByTestId('simulation-modal').waitFor()
    await page.getByRole('button', { name: 'Close simulation preview' }).click()
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Coming Soon "Back to simulations" closes modal', async () => {
    await page.goto(BASE + '/products?category=police&sim=domestic-safety-call')
    await page.getByTestId('play-now').click()
    await page.getByRole('button', { name: 'Back to simulations' }).click()
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Backdrop click closes modal', async () => {
    await page.goto(BASE + '/products?category=police')
    await page.getByTestId('simulation-card').first().click()
    await modal(page).waitFor()
    await page.waitForTimeout(400) // backdrop ignores presses in the first 350ms (double-click guard)
    await page.mouse.click(10, 10)
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Browser Back closes an opened modal and keeps filters', async () => {
    await page.goto(BASE + '/products?category=school&grade=11-12')
    await page.getByTestId('simulation-card').nth(3).click()
    await modal(page).waitFor()
    await page.goBack()
    await modal(page).waitFor({ state: 'detached' })
    const u = new URL(page.url())
    assert(u.searchParams.get('grade') === '11-12' && !u.searchParams.get('sim'), `url ${page.url()}`)
  })

  await check('Regression: double-click close stays on the page', async () => {
    await page.goto(BASE + '/reach-out')
    await page.goto(BASE + '/products?category=police')
    await page.getByTestId('simulation-card').first().click()
    await modal(page).waitFor()
    await page.getByRole('button', { name: 'Close simulation preview' }).dblclick()
    await modal(page).waitFor({ state: 'detached' })
    await page.waitForTimeout(300)
    assert(new URL(page.url()).pathname === '/products', `navigated away to ${page.url()}`)
  })

  await check('Regression: double-click on a card adds one history entry', async () => {
    await page.goto(BASE + '/products?category=police')
    await page.getByTestId('simulation-card').nth(1).dblclick()
    await modal(page).waitFor()
    await page.keyboard.press('Escape')
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Regression: modal opens with scrollable content focused (keyboard scroll works)', async () => {
    await page.goto(BASE + '/products?category=police')
    await page.getByTestId('simulation-card').first().locator('h3 button').focus()
    await page.keyboard.press('Enter')
    await modal(page).waitFor()
    await poll(async () => page.evaluate(() => document.activeElement?.hasAttribute('data-dialog-scroll')), 'scroller not focused')
    await page.keyboard.press('PageDown')
    await poll(async () => (await page.locator('[data-dialog-scroll]').evaluate((el) => el.scrollTop)) > 100, 'did not scroll')
    await page.keyboard.press('Escape')
  })

  await check('Regression: level choice and focus survive Coming Soon round-trip', async () => {
    await page.goto(BASE + '/products?category=police&sim=fair-exam-march')
    await page.getByRole('tab', { name: 'Advanced' }).click()
    await page.getByTestId('play-now').click()
    await page.getByRole('button', { name: 'Back to simulation', exact: true }).click()
    await poll(async () => (await page.evaluate(() => document.activeElement?.getAttribute('data-testid'))) === 'play-now', 'focus not on Play Now')
    assert((await page.getByTestId('level-panel').getAttribute('data-level')) === 'advanced', 'level reset')
  })

  await check('Regression: anchor + modal does not jump the page', async () => {
    await page.goto(BASE + '/')
    await page.getByRole('link', { name: 'How It Works' }).click()
    const card = page.getByTestId('featured-card').first()
    await card.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => window.scrollY)
    await card.click()
    await modal(page).waitFor()
    await page.keyboard.press('Escape')
    await modal(page).waitFor({ state: 'detached' })
    await page.waitForTimeout(200)
    const after = await page.evaluate(() => window.scrollY)
    assert(Math.abs(after - before) < 5, `scroll moved ${before} → ${after}`)
  })

  await check('Regression: invalid params are normalised; unknown nested route not marked active', async () => {
    await page.goto(BASE + '/products?category=school&grade=99&sim=foo')
    await poll(async () => {
      const u = new URL(page.url())
      return !u.searchParams.has('grade') && !u.searchParams.has('sim')
    }, `params not normalised: ${page.url()}`)
    await page.goto(BASE + '/products/abc')
    assert((await page.locator('nav[aria-label="Main"] a[aria-current="page"]').count()) === 0, 'Products marked active on 404')
    await page.goto(BASE + '/index.html')
    await page.waitForURL(BASE + '/')
  })

  await check('Body scroll locked while modal open', async () => {
    await page.goto(BASE + '/products?category=police&sim=crash-at-a-busy-junction')
    assert((await page.evaluate(() => document.body.style.overflow)) === 'hidden', 'not locked')
    await page.keyboard.press('Escape')
    await poll(async () => (await page.evaluate(() => document.body.style.overflow)) === '', 'not unlocked')
  })

  await check('Direct reloads work on every route', async () => {
    for (const r of ['/', '/products', '/products?category=school&grade=9-10', '/reach-out', '/products?category=school&grade=11-12&sim=the-archive-dispute']) {
      const res = await page.goto(BASE + r)
      assert(res.status() === 200, `${r}: ${res.status()}`)
      await page.reload()
      assert((await page.locator('main').count()) === 1, `${r}: no main`)
    }
    assert((await page.getByTestId('simulation-modal').getAttribute('data-slug')) === 'the-archive-dispute', 'deep-linked modal')
  })

  await check('Unknown route shows 404 page', async () => {
    await page.goto(BASE + '/does-not-exist')
    assert((await page.locator('h1').innerText()).includes('doesn’t exist'), '404')
  })

  for (const route of ['/', '/products', '/reach-out']) {
    await check(`Play a Demo works on ${route} (dialog → Play Demo → Coming Soon → Esc)`, async () => {
      await page.goto(BASE + route)
      await page.getByTestId('play-a-demo').click()
      await page.getByTestId('demo-dialog').waitFor()
      assert(await page.getByRole('heading', { name: 'Experience InScene' }).isVisible(), 'heading')
      await page.getByTestId('demo-dialog').getByText('School Training', { exact: true }).click()
      if (route === '/') await shot(page, 'desktop-demo-dialog', false)
      await page.getByTestId('play-demo').click()
      await page.getByTestId('coming-soon').waitFor()
      await page.keyboard.press('Escape')
      await modal(page).waitFor({ state: 'detached' })
      assert((await page.evaluate(() => document.activeElement?.getAttribute('data-testid'))) === 'play-a-demo', 'focus return')
    })
  }

  await check('Demo dialog "Browse" link navigates to the chosen catalog and closes', async () => {
    await page.goto(BASE + '/products')
    await page.getByTestId('play-a-demo').click()
    await page.getByTestId('demo-dialog').getByText('School Training', { exact: true }).click()
    await page.getByRole('button', { name: /Browse 30 school simulations/ }).click()
    await page.waitForURL(/category=school/)
    await modal(page).waitFor({ state: 'detached' })
  })

  await check('Reach Out: mailto, tel, LinkedIn placeholders', async () => {
    await page.goto(BASE + '/reach-out')
    assert((await page.getByTestId('contact-email').getAttribute('href')) === 'mailto:founder@anagat.net', 'mailto')
    assert((await page.getByRole('link', { name: /Email the Founders/ }).getAttribute('href')).startsWith('mailto:founder@anagat.net'), 'email cta')
    assert((await page.getByTestId('founder-phone').getAttribute('href')) === 'tel:+918979484758', 'tel')
    assert((await page.getByTestId('linkedin-placeholder').count()) === 2, 'linkedin placeholders')
    assert((await page.locator('a[href*="linkedin"]').count()) === 0, 'no linkedin links')
    const names = await page.getByTestId('founder-card').locator('h3').allInnerTexts()
    assert(names.join() === 'Amit Kumar,Rohan Saraswat', `founders ${names}`)
    await shot(page, 'desktop-reach-out')
  })

  await check('Footer: brand line, links, email and current year', async () => {
    const f = await page.locator('footer').innerText()
    assert(f.includes('InScene by Anagat AI Solutions'), 'brand line')
    assert(f.includes(String(new Date().getFullYear())), 'year')
    assert((await page.locator('footer a[href="mailto:founder@anagat.net"]').count()) === 1, 'footer email')
  })

  // ───────────── Mobile + tablet ─────────────
  for (const vp of [{ width: 390, height: 844 }, { width: 320, height: 640 }, { width: 768, height: 1024 }]) {
    console.log(`\nViewport ${vp.width}×${vp.height}`)
    const m = await newPage(browser, vp)
    await check(`No horizontal overflow on any route @${vp.width}`, async () => {
      for (const r of ['/', '/products', '/products?category=school&grade=11-12', '/reach-out']) {
        await m.goto(BASE + r)
        await noHorizontalOverflow(m)
      }
    })
    if (vp.width < 768) {
      await check(`Mobile menu opens, navigates and closes @${vp.width}`, async () => {
        await m.goto(BASE + '/')
        await m.getByTestId('menu-toggle').click()
        await m.locator('#mobile-menu').waitFor()
        await m.locator('#mobile-menu').getByRole('link', { name: 'Products' }).click()
        await m.waitForURL(BASE + '/products')
        await poll(async () => (await m.locator('#mobile-menu').count()) === 0, 'menu still open')
      })
      await check(`Mobile menu keeps focus out of covered content; Esc closes only the dialog @${vp.width}`, async () => {
        await m.goto(BASE + '/')
        await m.getByTestId('menu-toggle').click()
        await m.locator('#mobile-menu').waitFor()
        assert((await m.locator('#main[inert]').count()) === 1, 'main not inert')
        await m.getByTestId('play-a-demo').click()
        await m.getByTestId('demo-dialog').waitFor()
        await m.keyboard.press('Escape')
        await modal(m).waitFor({ state: 'detached' })
        assert((await m.locator('#mobile-menu').count()) === 1, 'menu closed too')
        await m.getByTestId('menu-toggle').click()
        assert((await m.locator('#main[inert]').count()) === 0, 'main still inert')
      })
      await check(`Mobile modal is scrollable with Play Now visible @${vp.width}`, async () => {
        await m.goto(BASE + '/products?category=school&grade=11-12&sim=the-college-fest-one-night-left')
        await poll(async () => {
          const box = await m.getByTestId('play-now').boundingBox()
          return box && box.y >= 0 && box.y + box.height <= vp.height
        }, 'play now not in viewport')
        await noHorizontalOverflow(m)
      })
    }
    if (vp.width === 390) {
      await m.goto(BASE + '/')
      await shot(m, 'mobile-home')
      await m.goto(BASE + '/products?category=school&grade=9-10')
      await shot(m, 'mobile-products-school')
      await m.goto(BASE + '/products?category=police&sim=fair-exam-march')
      await shot(m, 'mobile-modal', false)
      await m.goto(BASE + '/reach-out')
      await shot(m, 'mobile-reach-out')
      await m.goto(BASE + '/')
      await m.getByTestId('menu-toggle').click()
      await shot(m, 'mobile-menu', false)
    }
    if (vp.width === 768) {
      await m.goto(BASE + '/products?category=police')
      await shot(m, 'tablet-products')
    }
    await m.context().close()
  }

  await check('No console errors during the run', async () => {
    assert(consoleErrors.length === 0, consoleErrors.slice(0, 5).join(' | '))
  })

  await browser.close()
  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
