import { User } from '../../types/entities'

export interface ChatCardProps {
  user: User
  selected?: boolean
  onClick?: () => void
}
