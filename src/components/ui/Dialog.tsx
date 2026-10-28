import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy?: string
  children: ReactNode
  /** Element to focus on open; defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>
  /** Element to return focus to on close; defaults to the element focused before opening. */
  returnFocusRef?: RefObject<HTMLElement | null>
  className?: string
  /** Optional sticky footer rendered outside the scroll area. */
  footer?: ReactNode
  closeLabel?: string
}

/**
 * Accessible modal dialog: portal, aria-modal, background made inert, focus trap,
 * Escape / close button / backdrop click to dismiss, scroll lock and focus return.
 * Renders as a bottom sheet below the `sm` breakpoint.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  initialFocusRef,
  returnFocusRef,
  className,
  footer,
  closeLabel = 'Close',
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const openedAt = useRef(0)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    openedAt.current = performance.now()
    const previouslyFocused = document.activeElement as HTMLElement | null
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')
    root?.setAttribute('aria-hidden', 'true')

    // Default to the scrollable content so arrow / Page keys scroll it straight away.
    const focusTarget = initialFocusRef?.current ?? scrollRef.current ?? panelRef.current
    focusTarget?.focus({ preventScroll: true })

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
        return
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    // Capture phase, so Escape is handled here before any other document listener.
    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      root?.removeAttribute('inert')
      root?.removeAttribute('aria-hidden')
      // Read at close time on purpose: the trigger may be set after the dialog opened.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const target = returnFocusRef?.current ?? previouslyFocused
      if (target && document.contains(target)) target.focus({ preventScroll: true })
    }
    // initialFocusRef / returnFocusRef are read once per open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        data-testid="dialog-backdrop"
        className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[4px]"
        onMouseDown={() => {
          // Ignore the second half of a double-click that opened the dialog.
          if (performance.now() - openedAt.current > 350) onCloseRef.current()
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cn(
          'relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-modal outline-none',
          'animate-sheet-in sm:max-h-[min(92dvh,920px)] sm:animate-dialog-in sm:rounded-[20px]',
          className,
        )}
      >
        <button
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-navy shadow-xs ring-1 ring-navy/10 backdrop-blur transition-colors hover:bg-white sm:right-4 sm:top-4"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <div ref={scrollRef} tabIndex={-1} data-dialog-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none">
          {children}
        </div>
        {footer}
      </div>
    </div>,
    document.body,
  )
}
