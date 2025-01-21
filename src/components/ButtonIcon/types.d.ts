import { Icon } from '../../enums/Icon'

export interface ButtonIconProps {
  icon: Icon
  title: string
  type?: HTMLButtonElement['type']
  onClick?: () => void
}
