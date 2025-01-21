import { UserProvider } from '../../providers/UserProvider'
import './styles.css'
import { LayoutProps } from './types'

export function Layout({ children }: LayoutProps) {
  return (
    <UserProvider>
      <div className="layout">{children}</div>
    </UserProvider>
  )
}
