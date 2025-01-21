import { createContext } from 'react'
import { User } from '../types/entities'

export const UserContext = createContext<User | undefined>(undefined)
