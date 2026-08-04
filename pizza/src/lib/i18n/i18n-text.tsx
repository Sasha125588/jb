'use client'

import { useTranslations } from 'next-intl'

import type messages from '../../../locales/en.json'
import type { ICUArgs, ICUTags, MarkupTagsFunction, RichTagsFunction } from 'next-intl'
import type { ReactNode } from 'react'

export type FlatMessages = typeof messages
export type MessagePath = keyof FlatMessages & string

type MessageValues<Path extends MessagePath> = ICUArgs<
  FlatMessages[Path],
  {
    ICUArgument: string
    ICUNumberArgument: number | bigint
    ICUDateArgument: Date
  }
>

type RichValues<Path extends MessagePath> = MessageValues<Path> &
  ICUTags<FlatMessages[Path], RichTagsFunction>

type MarkupValues<Path extends MessagePath> = MessageValues<Path> &
  ICUTags<FlatMessages[Path], MarkupTagsFunction>

export type MessagePathWithoutValues = {
  [Path in MessagePath]: keyof RichValues<Path> extends never ? Path : never
}[MessagePath]

export type MessagePathWithValues = Exclude<MessagePath, MessagePathWithoutValues>

type UnionToIntersection<Union> = (Union extends unknown ? (value: Union) => void : never) extends (
  value: infer Intersection
) => void
  ? Intersection
  : never

type RichValuesFor<Path extends MessagePathWithValues> = UnionToIntersection<
  Path extends MessagePathWithValues ? RichValues<Path> : never
>

type MarkupValuesFor<Path extends MessagePathWithValues> = UnionToIntersection<
  Path extends MessagePathWithValues ? MarkupValues<Path> : never
>

type CommonProps<Path extends MessagePath> = {
  id?: string
  path: Path
}

type IntlTextWithoutValuesProps<Path extends MessagePathWithoutValues> = CommonProps<Path> & {
  html?: boolean
  values?: undefined
}

type IntlTextWithValuesProps<Path extends MessagePathWithValues> =
  | (CommonProps<Path> & {
      html?: false
      values: RichValuesFor<Path>
    })
  | (CommonProps<Path> & {
      html: true
      values: MarkupValuesFor<Path>
    })

export function IntlText<Path extends MessagePathWithoutValues>(
  props: IntlTextWithoutValuesProps<Path>
): ReactNode
export function IntlText<Path extends MessagePathWithValues>(
  props: IntlTextWithValuesProps<Path>
): ReactNode

export function IntlText({
  html,
  id,
  path,
  values,
}: CommonProps<MessagePath> & {
  html?: boolean
  values?: unknown
}) {
  const t = useTranslations()

  if (html)
    return (
      <span
        id={id}
        dangerouslySetInnerHTML={{
          __html: t.markup(path, values as never),
        }}
      />
    )

  return <span id={id}>{t.rich(path, values as never)}</span>
}
