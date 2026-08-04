import { useRender } from '@base-ui/react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import type { VariantProps } from 'class-variance-authority'

const typographyVariants = cva('', {
  variants: {
    variant: {
      display: 'text-5xl leading-none font-bold tracking-normal uppercase lg:text-[170px]',

      'heading-2xl': 'text-4xl leading-none font-extrabold tracking-normal md:text-8xl',
      'heading-xl': 'text-5xl leading-none font-extrabold tracking-normal md:text-7xl',
      'heading-lg': 'text-5xl leading-tight font-bold tracking-normal md:text-6xl',
      'heading-md': 'text-5xl leading-none font-bold tracking-tight',

      'title-lg': 'text-3xl leading-10 font-bold tracking-normal',
      'title-md': 'text-2xl leading-8 font-bold tracking-normal',
      'title-sm': 'text-xl leading-7 font-bold tracking-normal',

      'body-lg': 'text-xl leading-7 font-medium tracking-normal',
      'body-md': 'text-lg leading-7 font-medium tracking-normal',
      'body-sm': 'text-base leading-6 font-medium tracking-normal',

      link: 'text-base leading-6 font-medium tracking-normal hover:underline underline-offset-4',
      caption: 'text-sm leading-normal font-medium tracking-normal',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
})

type TypographyTag =
  | 'a'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'small'
  | 'time'
  | 'code'
  | 'blockquote'
  | 'strong'

type TypographyProps<Tag extends TypographyTag> = useRender.ComponentProps<Tag> &
  VariantProps<typeof typographyVariants> & {
    as?: Tag
  }

const Typography = <Tag extends TypographyTag>({
  as = 'div' as Tag,
  render,
  className,
  variant = 'body-md',
  ...props
}: TypographyProps<Tag>) =>
  useRender({
    defaultTagName: as,
    render,
    props: {
      className: cn(typographyVariants({ variant, className })),
      'data-slot': 'typography',
      'data-variant': variant,
      ...props,
    },
  })

export { Typography, typographyVariants }
