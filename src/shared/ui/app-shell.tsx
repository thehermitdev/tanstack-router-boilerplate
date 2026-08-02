import { Link } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

import { env } from '#/shared/config/env'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold tracking-tight">
            {env.VITE_APP_NAME}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Overview
            </Link>
            <Link to="/users" className="text-muted-foreground hover:text-foreground">
              Users example
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}
