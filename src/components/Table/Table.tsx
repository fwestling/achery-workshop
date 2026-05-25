import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { SortDirection } from '../../types/components'
import { Glyph } from '../../glyphs/Glyph'
import { Button } from '../Button/Button'
import * as styles from './Table.css'

/** Column definition for the {@link Table} component. */
export interface ColumnDef<T> {
  /** Field key on the row object — used for sorting and as the default cell value. */
  key: string
  /** Column header label. */
  label: string
  /** When true, the column header is clickable and cycles asc → desc → unsorted. */
  sortable?: boolean
  /** Render cell content in monospace — useful for IDs, codes, and measurements. */
  mono?: boolean
  /**
   * Custom cell renderer. Receives the full row object; return any React node.
   * When omitted, falls back to `String(row[key])`.
   */
  render?: (row: T) => ReactNode
  /** CSS width value applied to the column (e.g. `'120px'`, `'20%'`). */
  width?: string
}

/** Props for the {@link Table} component. */
export interface TableProps<T extends { [K in string]: unknown }> {
  /** Column configuration array — order determines display order. */
  columns: ColumnDef<T>[]
  /** Array of row data objects. */
  data: T[]
  /** Returns a stable unique string key for a row — used as the React key and for selection. */
  rowKey: (row: T) => string
  /**
   * Set of row keys that are currently selected. Selected rows receive a
   * left accent-coloured rule.
   */
  selectedKeys?: string[]
  /**
   * Called when a row is clicked. Receives the row's key and the full row object.
   * When provided, rows become clickable (pointer cursor).
   */
  onRowClick?: (key: string, row: T) => void
  /**
   * Controlled sort column key. Provide alongside `sortDir` and `onSortChange`
   * for fully controlled sort state.
   */
  sortKey?: string
  /** Controlled sort direction. Use with `sortKey`. */
  sortDir?: SortDirection
  /** Initial sort column key for uncontrolled usage. */
  defaultSortKey?: string
  /**
   * Initial sort direction for uncontrolled usage.
   * @default null
   */
  defaultSortDir?: SortDirection
  /**
   * Called when the sort state changes. Receives the column key and new direction.
   * For controlled mode, apply these values to `sortKey`/`sortDir`.
   * For uncontrolled mode, use this for side-effects (analytics, persistence) only.
   */
  onSortChange?: (key: string, dir: SortDirection) => void
  /** Current page index (0-based). Provide with `pageSize` for pagination. */
  pageIndex?: number
  /** Number of rows per page. Enables the pagination row below the table. */
  pageSize?: number
  /** Total row count across all pages — used to compute total page count. */
  totalRows?: number
  /** Called when the user navigates to a new page. */
  onPageChange?: (page: number) => void
  /** Content rendered above the table in a toolbar strip. */
  toolbar?: ReactNode
  /** Rendered when `data` is empty, in place of the table body. @default "No data." */
  emptyState?: ReactNode
  className?: string
}

/**
 * Data table with sortable columns, row selection, and hybrid controlled/uncontrolled
 * sort state.
 *
 * **Sort modes:**
 * - Uncontrolled: provide `defaultSortKey`/`defaultSortDir`; table manages state internally.
 * - Controlled: provide `sortKey` + `sortDir` + `onSortChange`; caller owns state.
 *
 * Sorting cycles through asc → desc → unsorted on repeated clicks of the same column.
 * Sort is performed client-side via `String.localeCompare` with `numeric: true`.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'status', label: 'Status', render: r => <Badge tone={r.tone}>{r.status}</Badge> },
 *     { key: 'id', label: 'ID', mono: true, width: '100px' },
 *   ]}
 *   data={recipes}
 *   rowKey={r => r.id}
 *   defaultSortKey="name"
 *   onRowClick={(key, row) => navigate(`/recipes/${key}`)}
 * />
 * ```
 */
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
  pageIndex = 0,
  pageSize,
  totalRows,
  onPageChange,
  toolbar,
  emptyState,
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

  const totalPages = pageSize && totalRows ? Math.ceil(totalRows / pageSize) : null
  const isFirstPage = pageIndex === 0
  const isLastPage = totalPages !== null ? pageIndex >= totalPages - 1 : true

  return (
    <div className={[styles.tableWrapper, className].filter(Boolean).join(' ')}>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
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
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className={styles.emptyState}>
                  {emptyState ?? 'No data.'}
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map(row => {
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
            })
          )}
        </tbody>
      </table>
      {pageSize && totalPages !== null && (
        <div className={styles.pagination}>
          <Button
            variant="ghost"
            size="sm"
            glyph="arrow-right"
            onClick={() => onPageChange?.(pageIndex - 1)}
            disabled={isFirstPage}
            aria-label="Previous page"
            style={{ transform: 'rotate(180deg)' }}
          />
          <span>Page {pageIndex + 1} of {totalPages}</span>
          <Button
            variant="ghost"
            size="sm"
            glyph="arrow-right"
            onClick={() => onPageChange?.(pageIndex + 1)}
            disabled={isLastPage}
            aria-label="Next page"
          />
        </div>
      )}
    </div>
  )
}
