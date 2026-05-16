import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { SortDirection } from '../../types/components.js'
import { Glyph } from '../../glyphs/Glyph.js'
import * as styles from './Table.css.js'

export interface ColumnDef<T> {
  key: string
  label: string
  sortable?: boolean
  mono?: boolean
  render?: (row: T) => ReactNode
  width?: string
}

export interface TableProps<T extends { [K in string]: unknown }> {
  columns: ColumnDef<T>[]
  data: T[]
  rowKey: (row: T) => string
  selectedKeys?: string[]
  onRowClick?: (key: string, row: T) => void
  sortKey?: string
  sortDir?: SortDirection
  defaultSortKey?: string
  defaultSortDir?: SortDirection
  onSortChange?: (key: string, dir: SortDirection) => void
  className?: string
}

export function Table<T extends { [K in string]: unknown }>({
  columns,
  data,
  rowKey,
  selectedKeys,
  onRowClick,
  sortKey: controlledSortKey,
  sortDir: controlledSortDir,
  defaultSortKey,
  defaultSortDir = null,
  onSortChange,
  className,
}: TableProps<T>) {
  const [internalSortKey, setInternalSortKey] = useState<string | null>(defaultSortKey ?? null)
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>(defaultSortDir)

  const isControlled = controlledSortKey !== undefined
  const activeSortKey = isControlled ? (controlledSortKey ?? null) : internalSortKey
  const activeSortDir = isControlled ? (controlledSortDir ?? null) : internalSortDir

  const handleSort = (key: string) => {
    let nextDir: SortDirection
    if (activeSortKey === key) {
      nextDir = activeSortDir === 'asc' ? 'desc' : activeSortDir === 'desc' ? null : 'asc'
    } else {
      nextDir = 'asc'
    }
    const nextKey = nextDir === null ? null : key

    if (!isControlled) {
      setInternalSortKey(nextKey)
      setInternalSortDir(nextDir)
    }
    onSortChange?.(key, nextDir)
  }

  const sortedData = useMemo(() => {
    if (!activeSortKey || !activeSortDir) return data
    return [...data].sort((a, b) => {
      const av = a[activeSortKey]
      const bv = b[activeSortKey]
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true })
      return activeSortDir === 'asc' ? cmp : -cmp
    })
  }, [data, activeSortKey, activeSortDir])

  return (
    <div className={[styles.tableWrapper, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={col.sortable ? styles.thSortable : styles.th}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  activeSortKey === col.key
                    ? activeSortDir === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                {col.label}
                {col.sortable && activeSortKey === col.key && activeSortDir && (
                  <span className={styles.sortIndicator} aria-hidden="true">
                    <Glyph name={activeSortDir === 'asc' ? 'arrow-up' : 'arrow-right'} size={10} />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(row => {
            const key = rowKey(row)
            const isSelected = selectedKeys?.includes(key) ?? false
            return (
              <tr
                key={key}
                className={styles.tr}
                data-selected={isSelected}
                onClick={onRowClick ? () => onRowClick(key, row) : undefined}
                style={onRowClick ? { cursor: 'pointer' } : undefined}
              >
                {columns.map(col => (
                  <td key={col.key} className={col.mono ? styles.tdMono : styles.td}>
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
