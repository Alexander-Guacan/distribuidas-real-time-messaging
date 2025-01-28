import { Message, User } from '../types/entities'

export async function getMessages({
  origin,
  destiny,
}: {
  origin: User
  destiny: User
}): Promise<Message[]> {
  const chat: Message[] = [
    {
      content: 'hola',
      from: origin,
      to: destiny,
    },
    {
      content: 'hola',
      from: destiny,
      to: origin,
    },
  ]
  return chat
}
