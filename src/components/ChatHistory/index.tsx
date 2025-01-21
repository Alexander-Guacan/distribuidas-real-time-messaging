import { ChatHistoryProps } from './types'
import UserPlaceholder from '../../assets/img/user/placeholder.png'
import { ImageIcon } from '../ImageIcon'
import { ButtonIcon } from '../ButtonIcon'
import { Icon } from '../../enums/Icon'
import './styles.css'
import { FormEventHandler, useEffect, useRef } from 'react'
import { Message } from '../../types/entities'
import { MessageBox } from '../MessageBox'
import { Placeholder } from '../Placeholder'

export function ChatHistory({
  origin,
  destiny,
  messages,
  onSubmit,
}: ChatHistoryProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    if (
      !onSubmit ||
      !origin ||
      !destiny ||
      !(event.target instanceof HTMLFormElement)
    )
      return

    const formData = Object.fromEntries(new FormData(event.target))
    const formMessage = formData['message'].toString()

    if (!formMessage.length) return

    const message: Message = {
      from: origin,
      to: destiny,
      content: formMessage,
    }

    onSubmit({
      message: message,
    })

    event.target.reset()
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

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
            {messages.map((message, index) => (
              <MessageBox
                user={message.from}
                key={index}
                sended={message.from.id === origin.id}
              >
                {message.content}
              </MessageBox>
            ))}
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
