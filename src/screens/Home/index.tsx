import { Chats } from '../../components/Chats'
import { ChatsEventHandler } from '../../components/Chats/types'
import { useOnlineUsers } from '../../hooks/useOnlineUsers'
import { ChatHistory } from '../../components/ChatHistory'
import './styles.css'
import { useChat } from '../../hooks/useChat'
import { useUser } from '../../hooks/useUser'
import { useState } from 'react'
import { User } from '../../types/entities'

export function Home() {
  const [destiny, setDestiny] = useState<User>()
  const { user } = useUser()
  const { onlineUsers } = useOnlineUsers()
  const { chat, sendMessage } = useChat({
    origin: user,
    destiny: destiny,
  })

  const handleChatSelect: ChatsEventHandler = ({ user }) => {
    setDestiny(user)
  }

  return (
    <main className="home">
      <Chats users={onlineUsers} onSelect={handleChatSelect} />
      <ChatHistory destiny={destiny} messages={chat} onSubmit={sendMessage} />
    </main>
  )
}
