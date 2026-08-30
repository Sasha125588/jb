import { CreditCardIcon } from 'lucide-react'

import { ProfileEmptyState } from '../../../ProfileEmptyState/ProfileEmptyState'
import { Button, Typography } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

export interface SavedCard {
  id: string
  lastFourDigits: string
}

interface ProfileCardsPanelProps {
  cards: SavedCard[]
  onRemoveCard?: (cardId: string) => void
}

export const ProfileCardsPanel = ({ cards, onRemoveCard }: ProfileCardsPanelProps) => {
  if (!cards.length) {
    return (
      <ProfileEmptyState
        description="profile.cards.empty.description"
        icon={<CreditCardIcon />}
        title="profile.cards.empty.title"
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
        <IntlText path="profile.cards.title" />
      </Typography>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col gap-3"
          >
            <div className="from-accent-quaternary/35 to-accent-quaternary flex aspect-[1.7/1] flex-col justify-between rounded-2xl bg-gradient-to-br p-4 text-white">
              <span className="w-fit rounded-full bg-black px-3 py-1 font-mono text-sm font-bold">
                jb
              </span>
              <span className="self-end text-xl">*{card.lastFourDigits}</span>
            </div>
            <Button
              className="w-full"
              disabled={!onRemoveCard}
              type="button"
              variant="secondary"
              onClick={() => onRemoveCard?.(card.id)}
            >
              <IntlText path="profile.cards.remove" />
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
