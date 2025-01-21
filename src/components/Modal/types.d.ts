import { ReactNode } from 'react'

export interface ModalProps {
  title: string
  message: string
  open?: boolean
  children?: ReactNode
}
