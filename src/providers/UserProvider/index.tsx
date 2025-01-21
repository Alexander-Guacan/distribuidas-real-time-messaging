import { UserProviderProps } from './types'
import { UserContext } from '../../contexts/UserContext'
import { Modal } from '../../components/Modal'
import './styles.css'
import { FormEventHandler, useEffect, useState } from 'react'
import { User } from '../../types/entities'
import { connectUser, getLastUserSession } from '../../services/user.service'

export function UserProvider({ children }: UserProviderProps) {
  const [nickname, setNickname] = useState<string>()
  const [user, setUser] = useState<User | undefined>(getLastUserSession)

  useEffect(() => {
    if (user !== undefined || !nickname) return
    connectUser({ nickname: nickname }).then((newUser) => setUser(newUser))
  }, [nickname, user])

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    if (!(event.target instanceof HTMLFormElement)) return

    const formData = Object.fromEntries(new FormData(event.target))
    const nickname = formData['nickname'].toString()

    if (!nickname.length) return

    setNickname(nickname)
    event.target.reset()
  }

  return (
    <UserContext.Provider value={user}>
      {children}
      <Modal title="Nickname" message="Set your nickname" open={!user}>
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
