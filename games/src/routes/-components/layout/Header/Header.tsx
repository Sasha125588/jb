import { Link } from '@tanstack/react-router'
import { HistoryIcon, LogOutIcon, UserIcon } from 'lucide-react'

import { Button } from '#/components/ui'

export const Header = () => (
  <header className="flex h-16 items-center justify-between px-4">
    <Link
      to="/"
      className="text-base font-extrabold tracking-wide"
    >
      <span className="pr-1 text-[22px]">🎮</span>GAMES
    </Link>
    <div className="flex items-center gap-5">
      <div className="flex gap-3">
        <div className="bg-muted hover:bg-muted-foreground/20 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors">
          <HistoryIcon size={20} />
        </div>
        <div className="bg-muted hover:bg-muted-foreground/20 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors">
          <UserIcon size={20} />
        </div>
      </div>
      <Button size="lg">
        Вийти
        <LogOutIcon />
      </Button>
    </div>
  </header>
)
