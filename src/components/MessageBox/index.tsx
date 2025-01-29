import './styles.css'
import { MessageBoxProps } from './types'

export function MessageBox({
  user,
  children,
  sended = false,
}: MessageBoxProps) {
  return (
    <p className={`message-box message-box--${sended ? 'sended' : ''}`}>
      <span className="message-box__nickname">{user}</span>
      {children}
    </p>
  )
}
