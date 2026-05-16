import * as RadixDialog from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import * as styles from './Modal.css.js'

export interface ModalProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  trigger?: ReactNode
  className?: string
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  footer,
  trigger,
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
          className={[styles.content, className].filter(Boolean).join(' ')}
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
          <div className={styles.body}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
