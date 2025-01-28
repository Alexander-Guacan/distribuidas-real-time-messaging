import { Icon } from '../../enums/Icon'
import { ButtonIcon } from '../ButtonIcon'
import './styles.css'
import { ModalProps } from './types'

export function Modal({
  title,
  message,
  open = false,
  closeDisabled = false,
  children,
}: ModalProps) {
  return (
    <dialog className="modal-container" open={open}>
      <aside className="modal">
        {!closeDisabled && (
          <form method="dialog" className="modal__close">
            <ButtonIcon icon={Icon.CLOSE} title="Close" />
          </form>
        )}
        <h6 className="modal__title">{title}</h6>
        <p className="modal__message">{message}</p>
        {children}
      </aside>
    </dialog>
  )
}
