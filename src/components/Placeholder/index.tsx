import { IconFactory } from '../IconFactory'
import './styles.css'
import { PlaceholderProps } from './types'

export function Placeholder({ message, icon }: PlaceholderProps) {
  return (
    <div className="placeholder">
      <IconFactory name={icon} />
      <p className="placeholder__message">{message}</p>
    </div>
  )
}
