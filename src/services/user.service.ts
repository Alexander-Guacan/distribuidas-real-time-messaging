import { User } from '../types/entities'
const USER_STORAGE_KEY = 'user'

export function saveSession({
  nickname,
}: {
  nickname: User['nickname']
}): User {
  const isValidNickname = nickname.length > 0

  if (!isValidNickname) {
    throw new Error('Invalid user name, please use different name')
  }

  const newUser: User = {
    nickname: nickname,
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))

  return newUser
}

export function getLastUserSession(): User | undefined {
  const lastUserSession = localStorage.getItem(USER_STORAGE_KEY)

  if (!lastUserSession) return

  const user: User = JSON.parse(lastUserSession)
  return user
}

export async function getOnlineUsers(): Promise<User[]> {
  const onlineUsers: User[] = []
  return onlineUsers
}
