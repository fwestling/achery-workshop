import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'
import { Body } from '../Typography/Typography'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConfirmOptions {
  /** Modal title. */
  title?: ReactNode
  /** Body message. */
  message: ReactNode
  /** Label for the confirm button. @default 'Confirm' */
  confirmLabel?: string
  /** Variant for the confirm button. @default 'accent' */
  confirmVariant?: 'accent' | 'secondary' | 'ghost'
  /** Label for the cancel button. @default 'Cancel' */
  cancelLabel?: string
  /**
   * When true, the confirm button is rendered in a destructive style
   * (terracotta-deep background, matching the existing danger idiom).
   * @default false
   */
  destructive?: boolean
}

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>

// ─── Context ──────────────────────────────────────────────────────────────────

const ConfirmContext = createContext<ConfirmFn | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

interface State {
  open: boolean
  opts: ConfirmOptions
  resolve: (value: boolean) => void
}

const EMPTY_OPTS: ConfirmOptions = { message: '' }
const NOOP_RESOLVE = (_: boolean) => {}

/** Renders a single in-theme confirm dialog. Mount once at your app root. */
export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({
    open: false,
    opts: EMPTY_OPTS,
    resolve: NOOP_RESOLVE,
  })

  const confirm = useCallback<ConfirmFn>((opts) => {
    return new Promise<boolean>((resolve) => {
      setState({ open: true, opts, resolve })
    })
  }, [])

  const settle = (value: boolean) => {
    state.resolve(value)
    setState((s) => ({ ...s, open: false }))
  }

  const { open, opts } = state
  const confirmLabel = opts.confirmLabel ?? 'Confirm'
  const cancelLabel = opts.cancelLabel ?? 'Cancel'

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal
        open={open}
        onOpenChange={(o) => { if (!o) settle(false) }}
        title={opts.title}
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="ghost" size="sm" onClick={() => settle(false)}>
              {cancelLabel}
            </Button>
            <Button
              variant={opts.confirmVariant ?? 'accent'}
              size="sm"
              onClick={() => settle(true)}
              style={opts.destructive ? {
                background: 'var(--achery-color-rust, #8a3a22)',
                borderColor: 'var(--achery-color-rust, #8a3a22)',
              } : undefined}
            >
              {confirmLabel}
            </Button>
          </div>
        }
      >
        {typeof opts.message === 'string'
          ? <Body variant="small">{opts.message}</Body>
          : opts.message}
      </Modal>
    </ConfirmContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns an async `confirm(opts)` function that resolves `true` if the user
 * clicks confirm, `false` if they cancel or close the dialog.
 *
 * Requires `<ConfirmDialogProvider>` to be mounted above the calling component.
 *
 * @example
 * ```tsx
 * const confirm = useConfirm()
 *
 * async function handleDelete() {
 *   const ok = await confirm({
 *     title: 'Delete task',
 *     message: 'This cannot be undone.',
 *     confirmLabel: 'Delete',
 *     destructive: true,
 *   })
 *   if (!ok) return
 *   await deleteTask(id)
 * }
 * ```
 */
export const useConfirm = (): ConfirmFn => {
  const fn = useContext(ConfirmContext)
  if (!fn) throw new Error('useConfirm must be used within a ConfirmDialogProvider')
  return fn
}
