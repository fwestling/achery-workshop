import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'

// Native counterpart of the web ConfirmDialog — same options, same hook.

export interface ConfirmOptions {
  /** Dialog title. */
  title?: ReactNode
  /** Body message. A plain string is rendered as body text. */
  message: ReactNode
  /** Label for the confirm button. @default 'Confirm' */
  confirmLabel?: string
  /** Variant for the confirm button. Ignored when `destructive`. @default 'accent' */
  confirmVariant?: 'accent' | 'secondary' | 'ghost'
  /** Label for the cancel button. @default 'Cancel' */
  cancelLabel?: string
  /** Render the confirm button in the danger style. @default false */
  destructive?: boolean
}

export type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmFn | null>(null)

const EMPTY_OPTS: ConfirmOptions = { message: '' }

/** Renders a single in-theme confirm dialog. Mount once, inside `NativeThemeProvider`. */
export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [opts, setOpts] = useState<ConfirmOptions>(EMPTY_OPTS)
  const resolveRef = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback<ConfirmFn>((next) => {
    // A second confirm while one is open answers the first with "no".
    resolveRef.current?.(false)
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
      setOpts(next)
      setOpen(true)
    })
  }, [])

  const settle = (value: boolean) => {
    resolveRef.current?.(value)
    resolveRef.current = null
    setOpen(false)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal
        open={open}
        onClose={() => settle(false)}
        title={opts.title}
        showClose={false}
        footer={
          <>
            <Button variant="ghost" size="sm" onPress={() => settle(false)}>
              {opts.cancelLabel ?? 'Cancel'}
            </Button>
            <Button
              variant={opts.destructive ? 'danger' : (opts.confirmVariant ?? 'accent')}
              size="sm"
              onPress={() => settle(true)}
            >
              {opts.confirmLabel ?? 'Confirm'}
            </Button>
          </>
        }
      >
        {opts.message}
      </Modal>
    </ConfirmContext.Provider>
  )
}

/**
 * Returns an async `confirm(opts)` that resolves `true` when the user confirms,
 * `false` when they cancel, tap the scrim or press back.
 *
 * Requires `<ConfirmDialogProvider>` above the calling component.
 *
 * @example
 * ```tsx
 * const confirm = useConfirm()
 *
 * const handleArchive = async () => {
 *   const ok = await confirm({
 *     title: 'Archive task?',
 *     message: 'It leaves your lists; history is kept.',
 *     confirmLabel: 'Archive',
 *   })
 *   if (ok) archive.mutate(id)
 * }
 * ```
 */
export const useConfirm = (): ConfirmFn => {
  const fn = useContext(ConfirmContext)
  if (!fn) throw new Error('useConfirm must be used within a ConfirmDialogProvider')
  return fn
}
