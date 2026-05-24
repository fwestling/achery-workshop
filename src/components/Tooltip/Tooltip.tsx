import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import * as styles from './Tooltip.css'

/** Props for the {@link Tooltip} component. */
export interface TooltipProps {
  /** Content rendered inside the tooltip bubble. */
  content: ReactNode
  /**
   * The element that triggers the tooltip on hover/focus. Must be a single
   * focusable element — wrapped with Radix `asChild`.
   */
  children: ReactNode
  /**
   * Preferred side of the trigger to display the tooltip.
   * Flips automatically when there is insufficient space.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * Milliseconds before the tooltip opens after the pointer enters.
   * Set to `0` for instant display.
   * @default 400
   */
  delayDuration?: number
  /**
   * Controlled open state. When provided alongside `onOpenChange`, the
   * tooltip is fully controlled.
   */
  open?: boolean
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void
}

/**
 * Contextual label that appears on hover or focus, built on Radix Tooltip.
 * Renders into a portal so it is never clipped by overflow:hidden ancestors.
 *
 * Theme CSS vars are inherited via `data-achery-root` on `<html>`, ensuring
 * the tooltip matches the active theme even though it is portaled.
 *
 * Always use for supplementary information — never to convey information
 * required to complete a task (that belongs in visible UI).
 *
 * @example
 * ```tsx
 * <Tooltip content="Steeping time: three minutes" side="top">
 *   <Button variant="ghost" glyph="info" aria-label="More info" />
 * </Tooltip>
 *
 * <Tooltip content="⌘K" delayDuration={0}>
 *   <Button variant="ghost">Search</Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content: tooltipContent,
  children,
  side = 'top',
  delayDuration = 400,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root
        {...(open !== undefined ? { open } : {})}
        {...(defaultOpen !== undefined ? { defaultOpen } : {})}
        {...(onOpenChange !== undefined ? { onOpenChange } : {})}
      >
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className={styles.content}
          >
            {tooltipContent}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
