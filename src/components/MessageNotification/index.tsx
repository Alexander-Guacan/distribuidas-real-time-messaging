import { MessageNotificationProps } from './types'
import './styles.css'

export function MessageNotification({ message }: MessageNotificationProps) {
  return <p className="message-notification">{message}</p>
}
