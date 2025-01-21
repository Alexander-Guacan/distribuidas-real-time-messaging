import UserPlaceholder from './../../assets/img/user/placeholder.png'
import { ChatCardProps } from './types'
import './styles.css'
import { ImageIcon } from '../ImageIcon'

export function ChatCard({ user, selected = false, onClick }: ChatCardProps) {
  return (
    <article
      className={`chat-card ${selected ? 'chat-card--selected' : ''}`}
      onClick={onClick}
    >
      <ImageIcon src={UserPlaceholder} alt="user placeholder" />
      <h4 className="chat-card__nickname">{user.nickname}</h4>
    </article>
  )
}
