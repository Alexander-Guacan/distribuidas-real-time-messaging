import { useState } from 'react'
import { Icon } from '../../enums/Icon'
import { User } from '../../types/entities'
import { ChatCard } from '../ChatCard'
import { Placeholder } from '../Placeholder'
import './styles.css'
import { ChatsProps } from './types'

export function Chats({ users, onSelect }: ChatsProps) {
  const [chatSelected, setChatSelected] = useState<User>()

  const handleClick = ({ user }: { user: User }) => {
    setChatSelected(user)

    if (!onSelect) return

    onSelect({ user: user })
  }

  return (
    <section className="chats">
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
    </section>
  )
}
