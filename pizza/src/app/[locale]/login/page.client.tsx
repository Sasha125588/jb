'use client'

import { ChevronLeftIcon, Loader2Icon } from 'lucide-react'
import { Activity } from 'react'

import { Countdown } from './_components/Countdown/Countdown'
import { useLoginPage } from './_hooks/useLoginPage'
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Typography,
} from '@/components/ui'
import { signInBodySchema } from '@/generated/zod/🔒 authSchemas/signInSchema'
import { IntlText } from '@/lib/i18n'

export const LoginPageClient = () => {
  const { state, form, masks, functions } = useLoginPage()

  return (
    <section className="min-h-full px-4 sm:grid sm:place-items-center sm:px-6">
      <div className="flex w-full flex-col sm:max-w-85 sm:gap-12">
        <Typography
          as="span"
          variant="body-sm"
          className="mx-auto hidden font-extrabold sm:flex"
        >
          <span className="pr-0.5 text-[22px]">🍕</span>PIZZA
        </Typography>
        <Activity mode={state.step === 'phone' ? 'visible' : 'hidden'}>
          <div>
            <div className="pb-4">
              <Typography
                as="h1"
                className="pb-4 sm:text-center"
                variant="title-md"
              >
                <IntlText path="page.login.phone.title" />
              </Typography>
              <Typography
                as="p"
                className="tracking-normal"
                variant="body-sm"
              >
                <IntlText path="page.login.phone.description" />
              </Typography>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              {
                <form.Field
                  name="phone"
                  validators={{ onChange: signInBodySchema.shape.phone }}
                  children={(field) => (
                    <Field>
                      <FieldLabel
                        className="sr-only"
                        htmlFor={field.name}
                      >
                        <IntlText path="field.login.phone.label" />
                      </FieldLabel>
                      <Input
                        autoComplete="off"
                        {...masks.phoneMask.register({
                          onBlur: field.handleBlur,
                        })}
                        id={field.name}
                        name={field.name}
                        placeholder="+7"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
              }

              <Button
                size="lg"
                type="submit"
                className="mt-4 flex w-full py-6"
              >
                {/* {state.isLoading && <Loader2Icon className='animate-spin' />} */}
                <IntlText path="button.submitPhone" />
              </Button>
            </form>
          </div>
        </Activity>
        <Activity mode={state.step === 'code' ? 'visible' : 'hidden'}>
          <div>
            <div>
              <div className="pb-4">
                <div className="flex items-center gap-4 pb-4">
                  <IconButton
                    rounded
                    className="size-6"
                    disabled={state.isLoading}
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={functions.onBack}
                  >
                    <ChevronLeftIcon className="size-6" />
                  </IconButton>
                  <Typography
                    as="h1"
                    className="sm:text-center"
                    variant="title-md"
                  >
                    <IntlText path="page.login.code.title" />
                  </Typography>
                </div>

                <Typography
                  as="p"
                  className="tracking-normal"
                  variant="body-sm"
                >
                  <IntlText path="page.login.code.description" />
                </Typography>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                {
                  <form.Field
                    name="code"
                    validators={{ onChange: signInBodySchema.shape.code }}
                    children={(field) => (
                      <Field>
                        <FieldLabel
                          className="sr-only"
                          htmlFor={field.name}
                        >
                          <IntlText path="field.login.code.label" />
                        </FieldLabel>
                        <Input
                          {...masks.codeMask.register({
                            onBlur: field.handleBlur,
                          })}
                          id={field.name}
                          name={field.name}
                          placeholder="999999"
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                }

                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    size="lg"
                    type="submit"
                    className="flex w-full py-6"
                  >
                    {state.isLoading && <Loader2Icon className="animate-spin" />}
                    <IntlText path="button.login" />
                  </Button>
                  <Countdown
                    loading={state.isRetrying}
                    retryAt={state.retryDelay}
                    onRetry={functions.onRetry}
                  />
                </div>
              </form>
            </div>
          </div>
        </Activity>
      </div>
    </section>
  )
}
