import { IconFactory } from '../IconFactory'
import './styles.css'
import { ButtonIconProps } from './types'

export function ButtonIcon({
  icon,
  title,
  type = 'button',
  className = '',
  onClick,
}: ButtonIconProps) {
  return (
    <button
      className={`button button-icon ${className}`}
      title={title}
      onClick={onClick}
      type={type}
    >
      <IconFactory name={icon} />
    </button>
  )
}
