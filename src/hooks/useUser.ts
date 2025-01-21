import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export function useUser() {
  const userContext = useContext(UserContext)
  return { user: userContext }
}
