import { useState } from 'react'
import { Icon } from '../../enums/Icon'
import { User } from '../../types/entities'
import { ChatCard } from '../ChatCard'
import { Placeholder } from '../Placeholder'
import './styles.css'
import { ChatsProps } from './types'
import { ButtonIcon } from '../ButtonIcon'

export function Chats({ users, onSelect }: ChatsProps) {
  const [chatSelected, setChatSelected] = useState<User>()
  const [isShrink, setIsShrink] = useState(false)

  const handleClick = ({ user }: { user: User }) => {
    setChatSelected(user)

    if (!onSelect) return

    onSelect({ user: user })
  }

  const handleMenuExpand = () => {
    setIsShrink((shrink) => !shrink)
  }

  return (
    <section className={`chats ${isShrink ? 'chats--shrink' : ''}`}>
      <ButtonIcon
        className="chats__menu"
        icon={Icon.MENU}
        title="chats"
        onClick={handleMenuExpand}
      />
      <div className={`chats__body`}>
        <h2>Chats</h2>
        {users.length ? (
          <div className="chats__list scrollbar-vertical">
            {users.map((user) => (
              <ChatCard
                key={user.id}
                user={user}
                selected={user.id === chatSelected?.id}
                onClick={() => handleClick({ user })}
              />
            ))}
          </div>
        ) : (
          <Placeholder icon={Icon.USER_OFFLINE} message="No users online" />
        )}
      </div>
    </section>
  )
}
