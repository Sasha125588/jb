'use client'

import { reatomComponent } from '@reatom/react'
import { useMount } from '@siberiacancode/reactuse'
import { ShoppingBasketIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { CatalogCartContent } from './components/CatalogCartContent'
import { CatalogCartErrorBoundary } from './components/CatalogCartErrorBoundary/CatalogCartErrorBoundary'
import { CatalogCartFooter } from './components/CatalogCartFooter'
import { useCatalogCart } from './hooks/useCatalogCart'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  IconButton,
  Typography,
} from '@/components/ui'
import { IntlText, useRouter } from '@/lib/i18n'

const CatalogCartRoot = reatomComponent(() => {
  const [mounted, setMounted] = useState(false)

  const [open, setOpen] = useState(false)
  const t = useTranslations()
  const router = useRouter()
  const { state, functions } = useCatalogCart({ open })

  const handleCheckout = () => {
    setOpen(false)
    router.push('/checkout')
  }

  useMount(() => setMounted(true))

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      swipeDirection="right"
    >
      <DrawerTrigger render={<Button className="relative flex h-12 items-center px-4" />}>
        <span className="bg-accent-quaternary border-background absolute -top-1.5 -right-1.5 flex size-5.5 items-center justify-center rounded-full border text-xs text-white tabular-nums">
          {mounted && state.totalQuantity()}
        </span>
        <ShoppingBasketIcon className="mt-px" />
        <Typography
          as="span"
          variant="caption"
        >
          <IntlText path="cart.title" />
        </Typography>
      </DrawerTrigger>

      <DrawerContent className="w-[480px]">
        <DrawerHeader className="border-border border-b px-5 py-5 sm:px-7 sm:py-6">
          <DrawerTitle className="flex items-center justify-between">
            <Typography
              as="span"
              variant="title-lg"
              className="text-[2rem]"
            >
              <IntlText path="cart.title" />
            </Typography>
            <DrawerClose
              render={
                <IconButton
                  variant="ghost"
                  rounded
                  aria-label={t('cart.close')}
                />
              }
            >
              <XIcon className="size-6" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <div className="min-h-0 flex-1 scrollbar-thin overflow-y-auto px-5 sm:px-6">
          <CatalogCartContent
            functions={functions}
            state={state}
          />
        </div>

        {state.hasLines ? (
          <CatalogCartFooter
            onRetryCalculation={functions.onRetryCalculation}
            state={state}
            onCheckout={handleCheckout}
          />
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}, 'CatalogCartRoot')

export const CatalogCart = () => (
  <CatalogCartErrorBoundary>
    <CatalogCartRoot />
  </CatalogCartErrorBoundary>
)
