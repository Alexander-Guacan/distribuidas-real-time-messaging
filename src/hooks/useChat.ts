import { useCallback, useEffect, useState } from 'react'
import { Message, User } from '../types/entities'
import SockJS from 'sockjs-client'
import { Client, over } from 'stompjs'
import { CHATROOM_NICKNAME } from '../constants'
import { MessageStatus } from '../enums/MessageStatus'

export function useChat({
  origin,
  destiny,
}: {
  origin?: User
  destiny?: User
}) {
  const [publicMessages, setPublicMessages] = useState<Message[]>([])
  const [privateMessages, setPrivateMessages] = useState<Message[]>([])
  const [stompClient, setStompClient] = useState<Client | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([
    { nickname: CHATROOM_NICKNAME },
  ])

  const connect = useCallback(() => {
    const sock = new SockJS('http://192.168.100.12:8080/ws')
    const client = over(sock)

    client.connect({}, () => {
      console.log('Connected to WebSocket')
      setStompClient(client)

      client.subscribe('/chatroom/public', (message) => {
        const msg: Message = JSON.parse(message.body)
        setOnlineUsers((prev) => {
          const isOwnChat = origin?.nickname === msg.senderName
          const isOldUser = prev.some(
            (user) =>
              msg.senderName === user.nickname &&
              msg.receiverName === CHATROOM_NICKNAME,
          )

          if (isOldUser || isOwnChat) return [...prev]

          const newUser = { nickname: msg.senderName }
          return [...prev, newUser]
        })
        setPublicMessages((prev) => [...prev, msg])
      })

      if (origin) {
        client.subscribe(`/user/${origin.nickname}/private`, (message) => {
          const msg: Message = JSON.parse(message.body)
          if (msg.senderName === origin.nickname) return
          setPrivateMessages((prev) => [...prev, msg])
        })
      }
    })

    return () => {
      if (client)
        client.disconnect(() => console.log('Disconnected from WebSocket'))
    }
  }, [origin])

  const sendPublicMessage = useCallback(
    ({ message }: { message: Message }) => {
      if (!stompClient || !origin) return

      stompClient.send('/app/message', {}, JSON.stringify(message))
    },
    [stompClient, origin],
  )

  const sendPrivateMessage = useCallback(
    ({ message }: { message: Message }) => {
      if (!stompClient || !origin || !destiny) return

      stompClient.send('/app/private-message', {}, JSON.stringify(message))
      setPrivateMessages((prev) => [...prev, message])
    },
    [stompClient, origin, destiny],
  )

  const closeConnection = useCallback(() => {
    if (!stompClient || !origin) return
    const message: Message = {
      date: new Date(Date.now()),
      message: 'bye mmvrgs',
      receiverName: CHATROOM_NICKNAME,
      senderName: origin?.nickname,
      status: MessageStatus.LEAVE,
    }

    stompClient.send('/app/message', {}, JSON.stringify(message))
  }, [stompClient, origin])

  useEffect(() => {
    if (origin) connect()
  }, [origin, connect])

  return {
    publicChat: publicMessages,
    privateChats: privateMessages,
    onlineUsers: onlineUsers,
    sendPublicMessage: sendPublicMessage,
    sendPrivateMessage: sendPrivateMessage,
    closeConnection: closeConnection,
  }
}
