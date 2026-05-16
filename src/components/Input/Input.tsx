import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import * as styles from './Input.css.js'

export interface FieldProps {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
  className?: string
}

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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  className?: string
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={[styles.inputBase, error && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  className?: string
}

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={[styles.textarea, error && styles.inputError, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  children: ReactNode
  className?: string
}

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

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

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
