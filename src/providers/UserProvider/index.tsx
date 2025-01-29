import { UserProviderProps } from './types'
import { UserContext } from '../../contexts/UserContext'
import { Modal } from '../../components/Modal'
import './styles.css'
import { FormEventHandler, useState } from 'react'
import { User } from '../../types/entities'
import { getLastUserSession, saveSession } from '../../services/user.service'

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(getLastUserSession)

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    if (!(event.target instanceof HTMLFormElement)) return

    const formData = Object.fromEntries(new FormData(event.target))
    const nickname = formData['nickname'].toString()

    if (!nickname.length) return

    const newUser = {
      nickname,
    }

    setUser(newUser)
    saveSession(newUser)
    event.target.reset()
  }

  return (
    <UserContext.Provider value={user}>
      {children}
      <Modal
        title="Nickname"
        message="Set your nickname"
        open={!user}
        closeDisabled
      >
        <form className="form-nickname" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="nickname"
            placeholder="John Doe"
            maxLength={25}
          />
        </form>
      </Modal>
    </UserContext.Provider>
  )
}
