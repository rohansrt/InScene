import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { brand } from '../../config/brand'
import { contact, mailto } from '../../config/contact'
import { Logo } from '../ui/Logo'
import { navItems } from '../../config/nav'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            {brand.tagline} Scenario-based learning for police training institutions and schools.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-ink-500 transition-colors hover:text-navy">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <a href={mailto()} className="mt-4 inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-blue">
            <Mail className="size-4" aria-hidden="true" />
            {contact.email}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p>
            {brand.name} by {brand.company}
          </p>
          <p>© {year} {brand.company}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
