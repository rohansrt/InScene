import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-[550] tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out-cubic disabled:pointer-events-none disabled:opacity-50 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary:
    'bg-blue text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_1px_2px_rgb(37_99_235/0.3)] hover:bg-blue-700',
  secondary: 'bg-white text-navy shadow-card hover:bg-surface hover:shadow-[0_0_0_1px_rgb(16_36_58/0.12)]',
  ghost: 'text-blue hover:bg-blue-50',
  dark: 'bg-navy text-white hover:bg-navy-800',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

interface StyleProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

function buttonClasses({ variant = 'primary', size = 'md', className }: Omit<StyleProps, 'children'>) {
  return cn(base, variants[variant], sizes[size], className)
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />
}

export function ButtonLink({ variant, size, className, ...rest }: StyleProps & LinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...rest} />
}

export function ButtonAnchor({
  variant,
  size,
  className,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses({ variant, size, className })} {...rest} />
}
