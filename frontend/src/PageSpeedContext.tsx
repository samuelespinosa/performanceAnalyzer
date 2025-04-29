// context/PageSpeedContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { fetchData } from './lib/api'

type Strategy = 'mobile' | 'desktop'

interface PageSpeedData {
  [strategy: string]: any
}

interface ContextType {
  data: Record<string, PageSpeedData>
  getData: (url: string, strategy: Strategy) => Promise<any>
}

const PageSpeedContext = createContext<ContextType | undefined>(undefined)

export const PageSpeedProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Record<string, PageSpeedData>>({})

  const getData = async (url: string, strategy: Strategy) => {
    const urlKey = url.trim().toLowerCase()
    const existing = data[urlKey]?.[strategy]
    if (existing) return existing

    const result = await fetchData(url, strategy)
    setData((prev) => ({
      ...prev,
      [urlKey]: {
        ...(prev[urlKey] || {}),
        [strategy]: result,
      },
    }))

    return result
  }

  return (
    <PageSpeedContext.Provider value={{ data, getData }}>
      {children}
    </PageSpeedContext.Provider>
  )
}

export const usePageSpeed = () => {
  const context = useContext(PageSpeedContext)
  if (!context) throw new Error('usePageSpeed must be used within PageSpeedProvider')
  return context
}
