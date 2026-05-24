import { useState, useCallback, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Glyph } from '../../glyphs/Glyph'
import * as styles from './Toast.css'

/** Shape of a single toast notification. */
export interface ToastData {
  /** Auto-generated unique ID — do not set manually; provided by {@link useToast}. */
  id: string
  /** Primary message. Keep short — one clause. */
  title: string
  /** Secondary detail line. Optional. */
  description?: string
  /**
   * How long (ms) before the toast auto-dismisses.
   * Pass `0` to keep it on screen until manually dismissed.
   * @default 4000
   */
  duration?: number
  /** Optional action element (e.g. an undo {@link Button}) rendered below the description. */
  action?: ReactNode
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Hook that returns the `toast()` imperative function for firing notifications.
 * Must be called within a component tree wrapped by {@link ToastProvider}.
 *
 * @throws If called outside a `<ToastProvider>`.
 *
 * @example
 * ```tsx
 * function SaveButton() {
 *   const { toast } = useToast()
 *   return (
 *     <Button onClick={() => toast({ title: 'Saved.', description: 'Changes committed.' })}>
 *       Save
 *     </Button>
 *   )
 * }
 * ```
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

/** Props for the {@link ToastProvider} component. */
export interface ToastProviderProps {
  children: ReactNode
}

/**
 * Context provider that manages the toast queue and renders the notification
 * stack into a portal at `document.body`. Place once near the root of your app,
 * inside `<AcheryProvider>`.
 *
 * Use the {@link useToast} hook anywhere in the subtree to fire toasts
 * imperatively.
 *
 * @example
 * ```tsx
 * // app root
 * <AcheryProvider>
 *   <ToastProvider>
 *     <App />
 *   </ToastProvider>
 * </AcheryProvider>
 *
 * // anywhere inside
 * const { toast } = useToast()
 * toast({ title: 'Entry deleted.', duration: 0, action: <Button size="sm">Undo</Button> })
 * ```
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = String(Date.now())
    setToasts(prev => [...prev, { ...data, id }])
    const duration = data.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <ol className={styles.viewport} aria-live="polite" aria-label="Notifications">
          {toasts.map(t => (
            <li key={t.id} className={styles.toast} role="status">
              <div>
                <div className={styles.toastTitle}>{t.title}</div>
                {t.description && (
                  <div className={styles.toastDescription}>{t.description}</div>
                )}
                {t.action && <div className={styles.toastAction}>{t.action}</div>}
              </div>
              <button
                className={styles.toastClose}
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
              >
                <Glyph name="cross" size={12} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}
