import { useEffect, useState } from 'react'
import { Message, User } from '../types/entities'
import { getMessages } from '../services/chat.service'

export function useChat({
  origin,
  destiny,
}: {
  origin?: User
  destiny?: User
}) {
  const [chat, setChat] = useState<Message[]>([])

  const sendMessage = ({ message }: { message: Message }) => {
    setChat((chat) => {
      const newChat = structuredClone(chat)
      newChat.push(message)
      return newChat
    })
  }

  useEffect(() => {
    if (!origin || !destiny) return

    getMessages({ origin: origin, destiny: destiny }).then((messages) =>
      setChat(messages),
    )
  }, [origin, destiny])

  return {
    chat: chat,
    destiny: destiny,
    sendMessage: sendMessage,
  }
}
