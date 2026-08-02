import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { RouterContext } from '#/app/router/router-context'
import { AppShell } from '#/shared/ui/app-shell'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The requested route does not exist.</p>
    </div>
  ),
})

function RootComponent() {
  return (
    <AppShell>
      <Outlet />
      {import.meta.env.DEV ? (
        <>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      ) : null}
    </AppShell>
  )
}
