export interface Founder {
  name: string
  role: string
  phone?: { display: string; href: string }
  /** Leave null until the real profile URL is supplied; the UI then renders a non-clickable placeholder. */
  linkedinUrl: string | null
}

export const contact = {
  email: 'founder@anagat.net',
  founders: [
    { name: 'Amit Kumar', role: 'Co-founder', linkedinUrl: null },
    {
      name: 'Rohan Saraswat',
      role: 'Co-founder',
      phone: { display: '+91 89794 84758', href: 'tel:+918979484758' },
      linkedinUrl: null,
    },
  ] satisfies Founder[],
}

export const mailto = (subject?: string) =>
  `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
