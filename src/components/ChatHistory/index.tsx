import { ChatHistoryProps } from './types'
import UserPlaceholder from '../../assets/img/user/placeholder.png'
import { ImageIcon } from '../ImageIcon'
import { ButtonIcon } from '../ButtonIcon'
import { Icon } from '../../enums/Icon'
import './styles.css'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { Message } from '../../types/entities'
import { MessageBox } from '../MessageBox'
import { Placeholder } from '../Placeholder'
import { MessageStatus } from '../../enums/MessageStatus'
import { CHATROOM_NICKNAME } from '../../constants'
import { MessageNotification } from '../MessageNotification'

export function ChatHistory({
  origin,
  destiny,
  publicChat,
  privateChat,
  onPublicSubmit,
  onPrivateSubmit,
}: ChatHistoryProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    if (
      !onPublicSubmit ||
      !onPrivateSubmit ||
      !origin ||
      !destiny ||
      !(event.target instanceof HTMLFormElement)
    )
      return

    const formData = Object.fromEntries(new FormData(event.target))
    const formMessage = formData['message'].toString()

    if (!formMessage.length) return

    const message: Message = {
      senderName: origin.nickname,
      receiverName: destiny.nickname,
      message: formMessage,
      status: MessageStatus.MESSAGE,
      date: new Date(Date.now()),
    }

    if (destiny.nickname === CHATROOM_NICKNAME) {
      onPublicSubmit({ message: message })
    } else {
      onPrivateSubmit({ message: message })
    }

    event.target.reset()
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [filteredMessages])

  useEffect(() => {
    if (destiny?.nickname === CHATROOM_NICKNAME) {
      setFilteredMessages(
        publicChat.filter(
          (message) => message.receiverName === CHATROOM_NICKNAME,
        ),
      )
    } else {
      setFilteredMessages(
        privateChat.filter(
          (message) =>
            (message.senderName === origin?.nickname ||
              message.senderName === destiny?.nickname) &&
            (message.receiverName === origin?.nickname ||
              message.receiverName === destiny?.nickname),
        ),
      )
    }
  }, [destiny, origin, privateChat, publicChat])

  return (
    <section className="chat-history">
      {origin && destiny ? (
        <>
          <header className="chat-history__header">
            <ImageIcon src={UserPlaceholder} alt="user placeholder" />
            <h3 className="chat-history__nickname">{destiny.nickname}</h3>
          </header>
          <div
            className="chat-history__messages scrollbar-vertical"
            ref={chatRef}
          >
            {filteredMessages.map((message, index) =>
              message.status === MessageStatus.LEAVE ? (
                <MessageNotification
                  key={index}
                  message={`El usuario ${message.senderName} se ha desconectado`}
                />
              ) : (
                <MessageBox
                  user={message.senderName}
                  key={index}
                  sended={message.senderName === origin.nickname}
                >
                  {message.message}
                </MessageBox>
              ),
            )}
          </div>
          <footer className="chat-history__footer">
            <form className="chat-history__form" onSubmit={handleSubmit}>
              <input
                className="input chat-history__input"
                name="message"
                type="text"
                placeholder="Type a message"
                maxLength={100}
                autoFocus
              />
              <ButtonIcon
                icon={Icon.SUBMIT}
                title="Send message"
                type="submit"
              />
            </form>
          </footer>
        </>
      ) : (
        <Placeholder
          icon={Icon.USER}
          message="Starts a conversation with one of the connected users"
        />
      )}
    </section>
  )
}
