import { User } from '../types/entities'
const USER_STORAGE_KEY = 'user'

export async function connectUser({
  nickname,
}: {
  nickname: User['nickname']
}): Promise<User | undefined> {
  const isValidNickname = nickname.length > 0

  if (!isValidNickname) {
    throw new Error('Invalid user name, please use different name')
  }

  const newUser: User = {
    id: 1,
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
  const onlineUsers: User[] = [
    {
      id: 2,
      nickname: 'camila',
    },
    {
      id: 3,
      nickname: 'luis',
    },
    {
      id: 4,
      nickname: 'nando',
    },
  ]
  return onlineUsers
}
