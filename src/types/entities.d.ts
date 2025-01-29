import { MessageStatus } from '../enums/MessageStatus'

export interface User {
  nickname: string
}

export interface Message {
  senderName: User['nickname']
  receiverName: User['nickname']
  message: string
  status: MessageStatus
  date: Date
}
