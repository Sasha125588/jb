import { CircleQuestionMarkIcon } from 'lucide-react'

import { Button, Modal } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

interface LogoutConfirmationProps {
  onConfirm: () => void
  onOpenChange: (value: boolean) => void
}

export const LogoutConfirmation = ({ onConfirm, onOpenChange }: LogoutConfirmationProps) => (
  <Modal
    icon={<CircleQuestionMarkIcon size={32} />}
    title={<IntlText path="modal.logout.title" />}
    onOpenChange={onOpenChange}
  >
    <div className="flex flex-col gap-4">
      <Button
        size="lg"
        type="button"
        variant="secondary"
        onClick={() => onOpenChange(false)}
      >
        <IntlText path="button.cancel" />
      </Button>
      <Button
        size="lg"
        type="button"
        onClick={() => {
          onOpenChange(false)
          onConfirm()
        }}
      >
        <IntlText path="button.logout" />
      </Button>
    </div>
  </Modal>
)
