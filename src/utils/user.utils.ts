import { User } from '../types/entities'

export function isUser(object: unknown): object is User {
  const isUser =
    (object as User).id !== undefined && (object as User).nickname !== undefined
  return isUser
}
