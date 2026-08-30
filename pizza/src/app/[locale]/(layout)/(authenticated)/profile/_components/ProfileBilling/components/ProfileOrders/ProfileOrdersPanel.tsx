'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { PizzaIcon } from 'lucide-react'

import { ProfileEmptyState } from '../../../ProfileEmptyState/ProfileEmptyState'
import { Typography } from '@/components/ui'
import { getPizzaOrdersQueryOptions } from '@/generated/hooks'
import { IntlText } from '@/lib/i18n'

import type { PizzaOrder } from '@/generated/types'

export const ProfileOrdersPanel = () => {
  const pizzaOrdersResponse = useSuspenseQuery(getPizzaOrdersQueryOptions())

  if (!pizzaOrdersResponse.data.orders.length) {
    return (
      <ProfileEmptyState
        description="profile.orders.empty.description"
        icon={<PizzaIcon />}
        title="profile.orders.empty.title"
        tone="accent"
      />
    )
  }

  return (
    <div>
      <Typography
        as="h2"
        className="mb-6"
        variant="title-lg"
      >
        <IntlText path="profile.orders.title" />
      </Typography>
      <div className="grid gap-4 md:grid-cols-2">
        {pizzaOrdersResponse.data.orders.map((order) => (
          <ProfileOrderCard
            key={order._id}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

const ProfileOrderCard = ({ order }: { order: PizzaOrder }) => {
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <article className="bg-secondary flex min-h-44 flex-col rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Typography
            as="h3"
            variant="title-sm"
          >
            <IntlText
              path="profile.orders.orderNumber"
              values={{ number: order._id.slice(-6).toUpperCase() }}
            />
          </Typography>
          <time className="text-muted-foreground mt-1 block text-sm">
            {new Intl.DateTimeFormat(undefined, {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }).format(new Date(order.createdAt))}
          </time>
        </div>
        <span className="bg-background rounded-full px-3 py-1 text-sm font-medium">
          <IntlText path={`profile.orders.status.${order.status}`} />
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <Typography
          as="p"
          className="text-muted-foreground"
          variant="caption"
        >
          <IntlText
            path="profile.orders.items"
            values={{ count: itemCount }}
          />
        </Typography>
        <Typography
          as="p"
          variant="title-sm"
        >
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,
          }).format(order.totalPrice)}
        </Typography>
      </div>
    </article>
  )
}
