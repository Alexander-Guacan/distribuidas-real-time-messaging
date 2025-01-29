import { User } from '../../types/entities'

export interface MessageBoxProps {
  user: User['nickname']
  children: string
  sended?: boolean
}
