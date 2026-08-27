import { useMediaQuery } from '@siberiacancode/reactuse'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './drawer'
import { Typography } from './typography'
import { cn } from '@/lib/utils'

import type { ReactNode } from 'react'

export interface ModalProps {
  children?: ReactNode
  className?: string
  description?: ReactNode
  icon?: ReactNode
  title?: ReactNode
  opened: boolean
  onOpenChange: (value: boolean) => void
}

export const Modal = ({
  icon,
  title,
  description,
  children,
  opened,
  onOpenChange,
  className,
}: ModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <Drawer
        open={opened}
        onOpenChange={onOpenChange}
      >
        <DrawerContent className={className}>
          <div className="overflow-y-auto">
            {(title || description) && (
              <DrawerHeader>
                {icon && <div className="flex justify-center p-2">{icon}</div>}
                {title && (
                  <DrawerTitle>
                    <Typography
                      as="span"
                      variant="title-sm"
                      className="text-center"
                    >
                      {title}
                    </Typography>
                  </DrawerTitle>
                )}
                {description && <DrawerDescription>{description}</DrawerDescription>}
              </DrawerHeader>
            )}
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={opened}
      onOpenChange={onOpenChange}
    >
      <DialogContent className={cn('w-lg', className)}>
        {(title || description) && (
          <DialogHeader>
            {icon && <div className="flex justify-center p-2">{icon}</div>}
            {title && (
              <DialogTitle className="px-2 py-3">
                <Typography
                  variant="title-sm"
                  as="span"
                  className="text-center"
                >
                  {title}
                </Typography>
              </DialogTitle>
            )}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
