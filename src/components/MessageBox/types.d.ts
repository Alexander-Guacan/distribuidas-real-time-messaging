import { User } from '../../types/entities'

export interface MessageBoxProps {
  user: User
  children: string
  sended?: boolean
}
