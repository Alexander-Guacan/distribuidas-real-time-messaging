import { FaUser, FaUserSlash } from 'react-icons/fa'
import { Icon } from '../../enums/Icon'
import './styles.css'
import { IconFactoryProps } from './types'
import { IoMdCloseCircle, IoMdMenu, IoMdSend } from 'react-icons/io'
import { IoChatboxOutline } from 'react-icons/io5'
import { GrStatusUnknown } from 'react-icons/gr'

export function IconFactory({ name }: IconFactoryProps) {
  switch (name) {
    case Icon.USER:
      return <FaUser className="icon" />

    case Icon.USER_OFFLINE:
      return <FaUserSlash className="icon" />

    case Icon.SUBMIT:
      return <IoMdSend className="icon" />

    case Icon.CHAT:
      return <IoChatboxOutline className="icon" />

    case Icon.CLOSE:
      return <IoMdCloseCircle className="icon" />

    case Icon.MENU:
      return <IoMdMenu className="icon" />

    default:
      return <GrStatusUnknown className="icon" />
  }
}
