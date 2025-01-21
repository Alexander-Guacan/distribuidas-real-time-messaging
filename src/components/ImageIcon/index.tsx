import { ImageIconProps } from './types'
import './styles.css'

export function ImageIcon({ src, alt }: ImageIconProps) {
  return <img className="img-icon" src={src} alt={alt} />
}
