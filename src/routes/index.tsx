import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Database, RouteIcon, ShieldCheck } from 'lucide-react'

import { Card } from '#/shared/ui/card'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const foundations = [
  {
    icon: RouteIcon,
    title: 'Typed routing',
    description:
      'File-based TanStack Router routes with typed search parameters and loader orchestration.',
  },
  {
    icon: Database,
    title: 'Server-state boundary',
    description:
      'TanStack Query owns remote cache state; route loaders only prefetch and coordinate.',
  },
  {
    icon: ShieldCheck,
    title: 'Validated contracts',
    description:
      'Axios handles transport while Zod validates all external data at runtime boundaries.',
  },
]

function HomePage() {
  return (
    <section className="space-y-10">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Enterprise SPA foundation</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Build features without rebuilding the architecture.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          A production-oriented starter based on Bun, React, TanStack Router, TanStack Query, Axios,
          Zod, Tailwind CSS v4, and shadcn/ui conventions.
        </p>
        <Link
          to="/users"
          search={{ page: 1, pageSize: 10 }}
          className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline"
        >
          Inspect the reference feature <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {foundations.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <Icon className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
