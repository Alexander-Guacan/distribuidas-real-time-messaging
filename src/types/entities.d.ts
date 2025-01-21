export interface User {
  id: number
  nickname: string
}

export interface Message {
  from: User
  to: User
  content: string
}
