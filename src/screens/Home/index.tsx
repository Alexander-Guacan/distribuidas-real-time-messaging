import { Chats } from '../../components/Chats'
import { ChatsEventHandler } from '../../components/Chats/types'
import { ChatHistory } from '../../components/ChatHistory'
import './styles.css'
import { useChat } from '../../hooks/useChat'
import { useUser } from '../../hooks/useUser'
import { useState } from 'react'
import { User } from '../../types/entities'

export function Home() {
  const [destiny, setDestiny] = useState<User>()
  const { user } = useUser()
  const {
    sendPrivateMessage,
    sendPublicMessage,
    publicChat,
    privateChats,
    onlineUsers,
  } = useChat({
    origin: user,
    destiny: destiny,
  })

  const handleChatSelect: ChatsEventHandler = ({ user }) => {
    setDestiny(user)
  }

  return (
    <main className="home">
      <Chats users={onlineUsers} onSelect={handleChatSelect} />
      <ChatHistory
        origin={user}
        destiny={destiny}
        publicChat={publicChat}
        privateChat={privateChats}
        onPublicSubmit={sendPublicMessage}
        onPrivateSubmit={sendPrivateMessage}
      />
    </main>
  )
}
