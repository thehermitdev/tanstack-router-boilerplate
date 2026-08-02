import { createFileRoute } from '@tanstack/react-router'

import { GettingStartedPage } from '#/features/getting-started'

export const Route = createFileRoute('/')({
  component: GettingStartedPage,
})
