import { Suspense } from 'react'

import { ProfileCardsPanel } from './components/ProfileCards/ProfileCardsPanel'
import { ProfileOrders } from './components/ProfileOrders/ProfileOrders'
import { Skeleton, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { SavedCard } from './components/ProfileCards/ProfileCardsPanel'

const savedCards: SavedCard[] = []

export const ProfileBilling = () => (
  <Tabs
    className="w-full min-w-0 gap-0"
    defaultValue="orders"
  >
    <span
      id="profile-tabs-label"
      className="sr-only"
    >
      <IntlText path="profile.tabs.label" />
    </span>
    <TabsList
      className="bg-secondary ml-auto flex min-h-12.5 rounded-4xl px-1.5 sm:w-45"
      aria-labelledby="profile-tabs-label"
    >
      <TabsTrigger
        className="h-10 w-22.5 rounded-4xl text-lg font-bold data-active:shadow-sm"
        value="orders"
      >
        <IntlText path="profile.tabs.orders" />
      </TabsTrigger>
      <TabsTrigger
        className="h-10 w-22.5 rounded-4xl text-lg font-bold data-active:shadow-sm"
        value="cards"
      >
        <IntlText path="profile.tabs.cards" />
      </TabsTrigger>
    </TabsList>

    <TabsContent
      className="mt-8 max-w-2/3 md:mt-10"
      value="orders"
    >
      <Suspense fallback={<ProfileBillingFallback />}>
        <ProfileOrders />
      </Suspense>
    </TabsContent>
    <TabsContent
      className="mt-8 max-w-2/3 md:mt-10"
      value="cards"
    >
      <ProfileCardsPanel cards={savedCards} />
    </TabsContent>
  </Tabs>
)

export const ProfileBillingFallback = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Skeleton className="h-44 rounded-3xl" />
    <Skeleton className="h-44 rounded-3xl" />
  </div>
)
