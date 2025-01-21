import { useEffect, useState } from 'react'
import { User } from '../types/entities'
import { getOnlineUsers } from '../services/user.service'

export function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  useEffect(() => {
    getOnlineUsers().then((users) => setOnlineUsers(users))
  }, [])

  return { onlineUsers }
}
