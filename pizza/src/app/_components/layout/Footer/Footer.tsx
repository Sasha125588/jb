import { FOOTER_CONTACTS, FOOTER_PRODUCTS } from './constants'
import { GithubIcon } from '@/components/icons/brands'
import { Typography } from '@/components/ui'
import { Link } from '@/lib/i18n'
import { IntlText } from '@/lib/i18n/i18n-text'

export const Footer = () => (
  <footer className="flex flex-col justify-between rounded-3xl bg-orange-50 px-8 py-4 dark:bg-orange-900/70">
    <div className="flex w-full items-baseline justify-between lg:gap-10">
      <div className="flex flex-col">
        <Link href="/">
          <div className="flex flex-col">
            <Typography
              as="span"
              variant="body-sm"
              className="flex items-center font-extrabold"
            >
              <span className="pr-0.5 text-[22px]">🍕</span>PIZZA
            </Typography>
            <Typography
              as="p"
              variant="body-sm"
              className="text-orange-900 dark:text-orange-200/90"
            >
              <IntlText path="brand.pizzeria" />
            </Typography>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6 text-orange-900 dark:text-orange-200/90">
        <Typography
          as="p"
          variant="body-md"
        >
          <IntlText path="menu" />
        </Typography>
        <ul className="flex flex-col gap-4">
          {FOOTER_PRODUCTS.map((item) => (
            <li key={item.labelKey}>
              <Link href={item.to}>
                <Typography variant="link">
                  <IntlText path={item.labelKey} />
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6 text-orange-900 dark:text-orange-200/90">
        <p className="">
          <IntlText path="contacts.title" />
        </p>
        <ul className="flex flex-col gap-4">
          {FOOTER_CONTACTS.map((item) => (
            <li key={item.labelKey}>
              <Link href={item.to}>
                <Typography variant="link">
                  <IntlText path={item.labelKey} />
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Typography
        as="a"
        variant="link"
        href="https://github.com/Sasha125588/jb/tree/main/pizza"
        className="flex items-center gap-2 text-orange-900 dark:text-orange-200/90"
      >
        <span>
          <IntlText path="github.link" />
        </span>{' '}
        <GithubIcon className="size-6" />
      </Typography>
    </div>
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <Typography
        as="a"
        variant="link"
        className="text-orange-900 opacity-50 transition-opacity hover:opacity-80 dark:text-orange-200/90"
        href="#"
      >
        <IntlText path="policy.privacy" />
      </Typography>
      <Typography
        as="a"
        variant="link"
        className="text-orange-900 opacity-50 transition-opacity hover:opacity-80 dark:text-orange-200/90"
        href="#"
      >
        <IntlText path="policy.terms" />
      </Typography>
    </div>
  </footer>
)
