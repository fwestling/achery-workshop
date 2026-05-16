import { useState, useCallback, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Glyph } from '../../glyphs/Glyph.js'
import * as styles from './Toast.css.js'

export interface ToastData {
  id: string
  title: string
  description?: string
  duration?: number
  action?: ReactNode
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export interface ToastProviderProps {
  children: ReactNode
}

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
