'use client'

import { GlobeIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { usePathname, useRouter } from '@/lib/i18n'

const languages = [
  { locale: 'en', label: 'EN', name: 'English' },
  { locale: 'uk-UA', label: 'UA', name: 'Українська' },
  { locale: 'ru', label: 'RU', name: 'Русский' },
]

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const currentLanguage = languages.find((l) => l.locale === locale)?.label ?? locale.toUpperCase()

  const handleChange = (lang: string) => {
    // @ts-expect-error
    router.replace({ pathname, params }, { locale: lang })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer"
          />
        }
      >
        <GlobeIcon size={18} />
        <span className="bg-primary text-primary-foreground absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold">
          {currentLanguage}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.locale}
            onClick={() => handleChange(lang.locale)}
            disabled={lang.locale === locale}
            className="cursor-pointer gap-3"
          >
            <span className="font-medium">{lang.label}</span>
            <span className="text-muted-foreground text-xs">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
