import { createContext, useContext, useState, type ReactNode } from 'react'

/** The search configuration published by {@link AppBar} for consumption by {@link Sidebar}. */
export interface AppBarSearchConfig {
  placeholder: string
  kbd?: string
  onSearch?: (query: string) => void
  onSearchFocus?: () => void
}

interface AppBarSearchContextValue {
  searchConfig: AppBarSearchConfig | null
  setSearchConfig: (config: AppBarSearchConfig | null) => void
}

export const AppBarSearchContext = createContext<AppBarSearchContextValue | null>(null)

/** Internal provider — rendered by {@link AcheryProvider}. Do not mount independently. */
export const AppBarSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchConfig, setSearchConfig] = useState<AppBarSearchConfig | null>(null)
  return (
    <AppBarSearchContext.Provider value={{ searchConfig, setSearchConfig }}>
      {children}
    </AppBarSearchContext.Provider>
  )
}

/** Returns the search context, or null if no AppBar with showSearch is mounted. */
export const useAppBarSearch = () => useContext(AppBarSearchContext)
