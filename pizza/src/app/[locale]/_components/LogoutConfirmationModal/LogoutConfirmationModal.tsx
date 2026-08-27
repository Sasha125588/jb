import { CircleQuestionMarkIcon } from 'lucide-react'
import { createModal } from 'react-modal-minimanager'

import { Button, Modal } from '@/components/ui'
import { IntlText } from '@/lib/i18n'

interface LogoutConfirmationModalProps {
  onConfirm: () => void
}

export const LogoutConfirmationModal = createModal<LogoutConfirmationModalProps>(
  ({ isOpen, close, onConfirm }) => (
    <Modal
      opened={isOpen}
      icon={<CircleQuestionMarkIcon size={32} />}
      title={<IntlText path="modal.logout.title" />}
      onOpenChange={(open) => {
        if (!open) close()
      }}
    >
      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          type="button"
          variant="secondary"
          onClick={() => close()}
        >
          <IntlText path="button.cancel" />
        </Button>
        <Button
          size="lg"
          type="button"
          onClick={() => {
            close()
            onConfirm()
          }}
        >
          <IntlText path="button.logout" />
        </Button>
      </div>
    </Modal>
  )
)
