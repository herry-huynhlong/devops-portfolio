'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let saved = null

    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {}

    const initial =
      saved === 'light' || saved === 'dark'
        ? saved
        : 'dark'

    setTheme(initial)

    document.documentElement.dataset.theme =
      initial

    document.documentElement.style.colorScheme =
      initial

    setMounted(true)
  }, [])


  function toggleTheme() {
    const next =
      theme === 'dark'
        ? 'light'
        : 'dark'

    setTheme(next)

    document.documentElement.dataset.theme =
      next

    document.documentElement.style.colorScheme =
      next

    try {
      localStorage.setItem(
        STORAGE_KEY,
        next
      )
    } catch {}
  }


  return (
    <button
      type="button"
      className={[
        'themeToggle',
        mounted ? 'themeToggleMounted' : '',
        theme === 'light'
          ? 'themeToggleLight'
          : 'themeToggleDark',
      ].join(' ')}
      onClick={toggleTheme}
      aria-label={
        theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      title={
        theme === 'dark'
          ? 'Turn on the lights'
          : 'Turn off the lights'
      }
    >
      <span
        className="themeToggleAura"
        aria-hidden="true"
      />

      <span
        className="themeToggleStars"
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </span>


      {theme === 'dark' ? (
        <svg
          className="themeIcon themeSun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3.5" />

          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.42 1.42" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.42" />
        </svg>
      ) : (
        <svg
          className="themeIcon themeMoon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}


      <span
        className="themeToggleLabel"
        aria-hidden="true"
      >
        {theme === 'dark'
          ? 'LIGHT'
          : 'DARK'}
      </span>
    </button>
  )
}
