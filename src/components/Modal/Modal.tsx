import * as RadixDialog from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import * as styles from './Modal.css'

/** Props for the {@link Modal} component. */
export interface ModalProps {
  /**
   * Controlled open state. When provided alongside `onOpenChange`, the
   * component is fully controlled. Omit for uncontrolled usage with
   * `defaultOpen` and a `trigger`.
   */
  open?: boolean
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Called when the open state changes — required for controlled usage. */
  onOpenChange?: (open: boolean) => void
  /** Dialog title rendered in display typeface above the description. */
  title?: ReactNode
  /** Secondary description line rendered below the title. */
  description?: ReactNode
  /** Main body content of the dialog — typically a form or informational layout. */
  children?: ReactNode
  /**
   * Footer slot rendered below the body with a top border. Typically holds
   * confirm/cancel {@link Button} elements aligned to the trailing edge.
   */
  footer?: ReactNode
  /**
   * Element that opens the dialog when clicked. Rendered as a Radix
   * `asChild` trigger — pass any single React element (e.g. a {@link Button}).
   * Omit when controlling `open` externally.
   */
  trigger?: ReactNode
  /**
   * Dialog width preset.
   * - `sm` — 400px (default)
   * - `md` — 560px
   * - `lg` — 760px
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * When true, the body area becomes scrollable with `max-height: 70vh`.
   * Use for modals with variable-length content.
   * @default false
   */
  scrollable?: boolean
  className?: string
}

/**
 * Accessible dialog built on Radix Dialog. Renders into a portal at
 * `document.body`, so it appears above all other content regardless of
 * stacking context. Includes focus trapping, `Escape` to close, and
 * backdrop click to dismiss.
 *
 * Theme CSS vars are inherited via `data-achery-root` on `<html>`, so
 * the modal matches the active theme and accent even though it is portaled.
 *
 * @example
 * ```tsx
 * // Uncontrolled with trigger
 * <Modal
 *   trigger={<Button variant="accent" glyph="plus">New recipe</Button>}
 *   title="New recipe"
 *   size="md"
 *   footer={<><Button variant="ghost">Cancel</Button><Button variant="primary">Save</Button></>}
 * >
 *   <Field label="Name"><Input autoFocus /></Field>
 * </Modal>
 *
 * // Controlled + scrollable
 * <Modal open={isOpen} onOpenChange={setIsOpen} title="Confirm" scrollable>…</Modal>
 * ```
 */
export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  trigger,
  size = 'sm',
  scrollable = false,
  className,
}: ModalProps) {
  return (
    <RadixDialog.Root
      {...(open !== undefined ? { open } : {})}
      {...(defaultOpen !== undefined ? { defaultOpen } : {})}
      {...(onOpenChange !== undefined ? { onOpenChange } : {})}
    >
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          className={[styles.contentSized({ size }), className].filter(Boolean).join(' ')}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          <div className={styles.header}>
            <div>
              {title && (
                <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
              )}
              {description && (
                <RadixDialog.Description id="modal-description" className={styles.description}>
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close className={styles.closeButton} aria-label="Close">
              <Glyph name="cross" size={14} aria-hidden="true" />
            </RadixDialog.Close>
          </div>
          <div className={scrollable ? styles.bodyScrollable : styles.body}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
