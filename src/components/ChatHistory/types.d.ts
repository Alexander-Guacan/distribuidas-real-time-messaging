import { Message, User } from '../../types/entities'

export type ChatHistoryEventHandler = ({
  message,
}: {
  message: Message
}) => void

export interface ChatHistoryProps {
  origin?: User
  destiny?: User
  messages: Message[]
  onSubmit?: ChatHistoryEventHandler
}
