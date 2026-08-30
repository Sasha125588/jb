'use client'

import { useMediaQuery } from '@siberiacancode/reactuse'
import { XIcon } from 'lucide-react'

import { useProfileEditForm } from '../../_hooks/useProfileEditForm'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/components/ui'
import { IntlText } from '@/lib/i18n'

import type { User } from '@/generated/types'

interface ProfileEditDrawerProps {
  open: boolean
  user: User
  onOpenChange: (open: boolean) => void
}

export const ProfileEditDrawer = ({ open, user, onOpenChange }: ProfileEditDrawerProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { state, form, validators, masks, functions } = useProfileEditForm(user, {
    onSuccess: () => onOpenChange(false),
  })
  const formattedPhone = masks.phoneMask.getValue('masked')

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) functions.reset()

    onOpenChange(nextOpen)
  }

  return (
    <Drawer
      open={open}
      swipeDirection={isMobile ? 'down' : 'right'}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent className="w-110 data-[swipe-axis=x]:[--drawer-content-width:min(36rem,calc(100vw-1rem))] data-[swipe-axis=y]:max-h-[calc(100dvh-4rem)]">
        <DrawerHeader className="flex flex-row justify-between px-4 pt-7 pb-0 text-left md:px-6 md:pt-8">
          <DrawerTitle className="text-left text-xl font-bold md:text-2xl">
            <IntlText path="profile.edit.title" />
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            <IntlText path="profile.edit.description" />
          </DrawerDescription>
          {!isMobile && (
            <DrawerClose
              render={
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                />
              }
            >
              <XIcon className="size-5" />
              <span className="sr-only">
                <IntlText path="profile.edit.close" />
              </span>
            </DrawerClose>
          )}
        </DrawerHeader>

        <form
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-7 pb-6 md:px-6 md:pt-8"
          aria-busy={state.isSaving}
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="gap-5">
            <form.Field
              name="firstname"
              validators={{ onBlur: validators.firstname, onSubmit: validators.firstname }}
            >
              {(field) => {
                const invalid = field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path="profile.edit.firstname" />
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      autoComplete="given-name"
                      aria-invalid={invalid}
                      disabled={state.isSaving}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            </form.Field>

            <Field>
              <FieldLabel htmlFor="profile-phone">
                <IntlText path="profile.edit.phone" />
              </FieldLabel>
              <Input
                id="profile-phone"
                value={formattedPhone}
                aria-readonly="true"
                readOnly
                disabled
              />
            </Field>

            <form.Field
              name="email"
              validators={{ onBlur: validators.email, onSubmit: validators.email }}
            >
              {(field) => {
                const invalid = field.state.meta.errors.length > 0

                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={field.name}>
                      <IntlText path="profile.edit.email" />
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      autoComplete="email"
                      aria-invalid={invalid}
                      disabled={state.isSaving}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>

          {state.submitError && (
            <p
              className="text-destructive mt-4 text-sm"
              role="alert"
            >
              <IntlText path={state.submitError} />
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 md:mt-7">
            <Button
              className="w-full py-6"
              disabled={state.isSaving}
              size="lg"
              type="submit"
              variant="secondary"
            >
              <IntlText path={state.isSaving ? 'profile.edit.saving' : 'profile.edit.submit'} />
            </Button>

            {isMobile && (
              <DrawerClose
                render={
                  <Button
                    className="w-full py-6"
                    disabled={state.isSaving}
                    size="lg"
                    type="button"
                    variant="accent"
                  />
                }
              >
                <IntlText path="button.cancel" />
              </DrawerClose>
            )}
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
