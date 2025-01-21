import { User } from '../../types/entities'

export type ChatsEventHandler = ({ user }: { user: User }) => void

export interface ChatsProps {
  users: User[]
  onSelect?: ChatsEventHandler
}
