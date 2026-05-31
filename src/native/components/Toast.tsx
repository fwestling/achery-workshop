import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import { Glyph } from './Glyph'

export interface ToastData {
  id: string
  title: string
  description?: string
  duration?: number
  action?: ReactNode
}

export type ToastOptions = Omit<ToastData, 'id'>

interface ToastContextValue {
  toast: (opts: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export const useToast = () => useContext(ToastContext)

let idCounter = 0

export interface ToastProviderProps {
  children: ReactNode
}

/**
 * Wrap your navigation root with `ToastProvider`. Toasts render in an absolute
 * overlay at the bottom of the screen — the provider must span the full screen
 * height (`flex: 1`) for positioning to work correctly.
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { tokens } = useTheme()
  const [toasts, setToasts] = useState<ToastData[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) { clearTimeout(timer); timers.current.delete(id) }
  }, [])

  const toast = useCallback((opts: ToastOptions) => {
    const id = String(++idCounter)
    const duration = opts.duration ?? 4000
    setToasts(prev => [...prev, { ...opts, id }])
    const timer = setTimeout(() => dismiss(id), duration)
    timers.current.set(id, timer)
  }, [dismiss])

  useEffect(() => {
    const t = timers.current
    return () => t.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <View style={{ flex: 1 }}>
        {children}
        <View
          style={{
            position: 'absolute',
            bottom: spacing.sp8,
            left: spacing.sp5,
            right: spacing.sp5,
            gap: spacing.sp2,
          }}
          pointerEvents="box-none"
        >
          {toasts.map(t => (
            <View
              key={t.id}
              style={{
                backgroundColor: tokens.fg,
                padding: spacing.sp4,
                borderWidth: 1,
                borderColor: tokens.border2,
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: spacing.sp3,
              }}
            >
              <View style={{ flex: 1, gap: spacing.sp1 }}>
                <Text
                  style={{
                    color: tokens.bg,
                    fontSize: 13,
                    fontWeight: fontWeights.semibold.toString() as any,
                  }}
                >
                  {t.title}
                </Text>
                {t.description && (
                  <Text style={{ color: tokens.bg, fontSize: 12, opacity: 0.75 }}>
                    {t.description}
                  </Text>
                )}
                {t.action}
              </View>
              <TouchableOpacity onPress={() => dismiss(t.id)} hitSlop={8}>
                <Glyph name="cross" size={12} color={tokens.bg} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ToastContext.Provider>
  )
}
