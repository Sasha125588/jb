import { Link } from '@tanstack/react-router'

import { GithubIcon } from '#/components/icons/brands/GithubIcon'
import { FOOTER_CONTACTS, FOOTER_PRODUCTS, FOOTER_REPOSITORY_URL } from './constants'

export const Footer = () => (
  <footer className="bg-secondary flex flex-col justify-between rounded-3xl px-8 py-4">
    <div className="flex w-full items-baseline justify-between lg:gap-10">
      <div className="flex flex-col">
        <Link to="/">
          <div className="text-base font-extrabold tracking-wide">
            <span className="pr-1 text-[22px]">🎮</span>GAMES
          </div>
          <p className="font-medium">магазин ігор</p>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <p className="">Игры</p>
        <ul className="flex flex-col gap-4">
          {FOOTER_PRODUCTS.map((item) => (
            <li key={item.label}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <p className="">Связаться с нами</p>
        <ul className="flex flex-col gap-4">
          {FOOTER_CONTACTS.map((item) => (
            <li key={item.label}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <a
        href={FOOTER_REPOSITORY_URL}
        className="flex gap-2"
      >
        <span>Ссылка на GitHub</span> <GithubIcon className="size-6" />
      </a>
    </div>
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <a
        className="text-foreground/40 transition-opacity hover:opacity-80"
        href="#"
      >
        Политика конфиденциальности
      </a>
      <a
        className="text-foreground/40 transition-opacity hover:opacity-80"
        href="#"
      >
        Пользовательское соглашение
      </a>
    </div>
  </footer>
)
