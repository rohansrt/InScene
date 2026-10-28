import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { LinkedInIcon as Linkedin } from '../components/ui/LinkedInIcon'
import { ButtonAnchor } from '../components/ui/Button'
import { contact, mailto, type Founder } from '../config/contact'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ReachOut() {
  useDocumentTitle('Reach Out', 'Contact the InScene founders at Anagat AI Solutions about scenario-based learning for your institution or school.')
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link remains */
    }
  }

  return (
    <div className="relative overflow-hidden pb-24 sm:pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_20%_0%,rgb(18_184_166/0.07),transparent_70%),radial-gradient(50%_60%_at_90%_10%,rgb(37_99_235/0.07),transparent_70%)]" />
      <div className="container-site pt-10 sm:pt-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Reach out</p>
          <h1 className="display mt-4 !text-[clamp(2.4rem,3.6vw+1rem,4rem)]">Let's build better learning experiences.</h1>
          <p className="lead mt-6 text-ink-500">
            Whether you run a police training institution, lead a school, or want to collaborate on scenario-based
            learning, we would love to hear from you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <section aria-labelledby="email-heading" className="flex flex-col rounded-[20px] bg-white p-7 shadow-card sm:p-9">
            <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <h2 id="email-heading" className="mt-6 text-2xl font-[650] tracking-[-0.025em]">
              Write to the founders
            </h2>
            <p className="mt-2 leading-relaxed text-ink-500">
              Tell us about your learners and what you would like them to practise. We usually start with a short
              conversation.
            </p>
            <p className="mt-6">
              <a
                href={mailto()}
                className="break-all text-xl font-semibold tracking-[-0.01em] text-navy underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-blue hover:decoration-blue/40 sm:text-2xl"
                data-testid="contact-email"
              >
                {contact.email}
              </a>
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <ButtonAnchor href={mailto('InScene enquiry')} size="lg">
                <Mail className="size-4" aria-hidden="true" />
                Email the Founders
              </ButtonAnchor>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-[550] text-navy shadow-card transition-colors hover:bg-surface"
              >
                {copied ? <Check className="size-4 text-teal-700" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </button>
            </div>
          </section>

          <section aria-labelledby="founders-heading">
            <h2 id="founders-heading" className="sr-only">
              Founders
            </h2>
            <ul className="grid h-full gap-6">
              {contact.founders.map((f) => (
                <li key={f.name}>
                  <FounderCard founder={f} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

function FounderCard({ founder }: { founder: Founder }) {
  const initials = founder.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <article className="flex h-full flex-col rounded-[20px] bg-white p-7 shadow-card" data-testid="founder-card">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-teal))] text-lg font-semibold text-white"
        >
          {initials}
        </span>
        <div>
          <h3 className="text-lg font-[640] tracking-[-0.015em]">{founder.name}</h3>
          <p className="text-sm text-ink-500">{founder.role}, InScene</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {founder.phone && (
          <a
            href={founder.phone.href}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] px-3.5 text-sm font-medium text-navy shadow-card transition-colors hover:bg-surface"
            data-testid="founder-phone"
          >
            <Phone className="size-4 text-blue" aria-hidden="true" />
            {founder.phone.display}
          </a>
        )}
        {founder.linkedinUrl ? (
          <a
            href={founder.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] px-3.5 text-sm font-medium text-navy shadow-card transition-colors hover:bg-surface"
          >
            <Linkedin className="size-4 text-blue" aria-hidden="true" />
            Connect on LinkedIn
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span
            className="inline-flex min-h-10 cursor-default items-center gap-2 rounded-[10px] border border-dashed py-2 border-line px-3.5 text-sm text-ink-500"
            data-testid="linkedin-placeholder"
          >
            <Linkedin className="size-4" aria-hidden="true" />
            LinkedIn profile coming soon
          </span>
        )}
      </div>
    </article>
  )
}
