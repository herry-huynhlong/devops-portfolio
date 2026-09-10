'use client'

import { ContentProvider } from '@/lib/content-context'
import ThemeToggle from './ThemeToggle'

export default function ClientLayout({ children }) {
  return (
    <ContentProvider>
      <ThemeToggle />

      {children}
    </ContentProvider>
  )
}
