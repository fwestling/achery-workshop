import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from 'react'
import { Glyph } from '../../glyphs/Glyph'
import * as styles from './Input.css'

/** Props for the {@link Field} wrapper component. */
export interface FieldProps {
  /** Visible label rendered above the input. */
  label?: string
  /** Helper text shown below the input when there is no error. */
  hint?: string
  /**
   * Error message. When present, replaces the hint and applies error styling
   * to the field. Pass to {@link Input}, {@link Textarea}, or {@link Select}
   * via their `error` boolean prop to also colour the input itself.
   */
  error?: string
  children: ReactNode
  className?: string
}

/**
 * Layout wrapper that pairs a label, input control, and hint/error text.
 * Compose with {@link Input}, {@link Textarea}, or {@link Select} as `children`.
 *
 * @example
 * ```tsx
 * <Field label="Name" hint="As it appears on the specimen jar">
 *   <Input placeholder="Iron-gall ink" />
 * </Field>
 *
 * <Field label="Notes" error="Required">
 *   <Textarea error rows={4} />
 * </Field>
 * ```
 */
export function Field({ label, hint, error, children, className }: FieldProps) {
  return (
    <div className={[styles.fieldRoot, className].filter(Boolean).join(' ')}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.errorText}>{error}</span>}
      {!error && hint && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}

/** Props for the {@link Input} component. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** When true, applies error border colouring. Pair with {@link Field} `error` prop. */
  error?: boolean
  className?: string
}

/**
 * Single-line text input. Forwards all native `<input>` attributes.
 * Wrap in {@link Field} to add a label and hint/error text.
 *
 * @example
 * ```tsx
 * <Input placeholder="Search recipes…" type="search" />
 * <Input error value={value} onChange={handleChange} />
 * ```
 */
export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={[styles.inputBase, error && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

/** Props for the {@link Textarea} component. */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** When true, applies error border colouring. Pair with {@link Field} `error` prop. */
  error?: boolean
  className?: string
}

/**
 * Multi-line text input. Forwards all native `<textarea>` attributes.
 * Wrap in {@link Field} to add a label and hint/error text.
 *
 * @example
 * ```tsx
 * <Field label="Process notes">
 *   <Textarea rows={5} placeholder="Describe proportions and method…" />
 * </Field>
 * ```
 */
export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={[styles.textarea, error && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

/** Props for the {@link Select} component. */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** When true, applies error border colouring. Pair with {@link Field} `error` prop. */
  error?: boolean
  children: ReactNode
  className?: string
}

/**
 * Native `<select>` dropdown with Achery styling. For complex requirements
 * (searchable, multi-select, grouped options) the Radix Select primitive is
 * available via `TabsPrimitive` export — but for most form use-cases the
 * native select is sufficient and more accessible.
 *
 * @example
 * ```tsx
 * <Field label="Chapter">
 *   <Select>
 *     <option value="">Select a chapter…</option>
 *     <option value="ink">Ink</option>
 *     <option value="pigment">Pigment</option>
 *   </Select>
 * </Field>
 * ```
 */
export function Select({ error, children, className, ...props }: SelectProps) {
  return (
    <select
      className={[styles.selectInput, error && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </select>
  )
}

/** Props for the {@link SearchInput} component. */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

/**
 * Search input with a built-in compass glyph icon and `type="search"`.
 * Use in headers, toolbars, or filter panels.
 *
 * @example
 * ```tsx
 * <SearchInput placeholder="Search recipes…" value={q} onChange={e => setQ(e.target.value)} />
 * ```
 */
export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={[styles.searchWrapper, className].filter(Boolean).join(' ')}>
      <Glyph name="compass" size={12} className={styles.searchIcon} aria-hidden="true" />
      <input
        type="search"
        className={styles.searchInput}
        {...props}
      />
    </div>
  )
}
