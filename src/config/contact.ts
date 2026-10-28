export interface Founder {
  name: string
  role: string
  image: string
  websiteUrl?: string
  phone?: { display: string; href: string }
  /** Leave null until the real profile URL is supplied; the UI then renders a non-clickable placeholder. */
  linkedinUrl: string | null
}

export const contact = {
  email: 'founder@anagat.net',
  founders: [
    {
      name: 'Amit Kumar',
      role: 'Co-founder',
      image: 'amit-kumar.webp',
      phone: { display: '+91 86709 90985', href: 'tel:+918670990985' },
      linkedinUrl: 'https://www.linkedin.com/in/amit-kumar-iitkgp/',
    },
    {
      name: 'Rohan Saraswat',
      role: 'Co-founder',
      image: 'rohan-saraswat.webp',
      websiteUrl: 'https://rohansrt.cc',
      phone: { display: '+91 89794 84758', href: 'tel:+918979484758' },
      linkedinUrl: 'https://www.linkedin.com/in/rohansrt/',
    },
  ] satisfies Founder[],
}

export const mailto = (subject?: string) =>
  `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

export const whatsappUrl = (founder: Founder) => {
  if (!founder.phone) return undefined
  const number = founder.phone.href.replace(/\D/g, '')
  const message = `Hi ${founder.name.split(' ')[0]}, I'd like to learn more about InScene.`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
