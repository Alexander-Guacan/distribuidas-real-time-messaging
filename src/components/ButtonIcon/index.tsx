import { IconFactory } from '../IconFactory'
import './styles.css'
import { ButtonIconProps } from './types'

export function ButtonIcon({
  icon,
  title,
  type = 'button',
  onClick,
}: ButtonIconProps) {
  return (
    <button
      className="button button-icon"
      title={title}
      onClick={onClick}
      type={type}
    >
      <IconFactory name={icon} />
    </button>
  )
}
