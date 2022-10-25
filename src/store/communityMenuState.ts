import { TiHome } from "react-icons/ti"
import { atom } from "jotai"
import { IconType } from "react-icons"

/**
 * Enable global access to menu
 */

type CommunityMenuElement = {
  communityName: string
  link: string
  icon: IconType
  iconColor: string
  imageUrl?: string
}

interface CommunityMenuState {
  isOpen: boolean
  selectedMenuElement: CommunityMenuElement
}

// generalised menu element
const defaultMenuElement: CommunityMenuElement = {
  communityName: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
}

const defaultMenuState: CommunityMenuState = {
  isOpen: false,
  selectedMenuElement: defaultMenuElement,
}

const communityMenuAtom = atom<CommunityMenuState>(defaultMenuState)

export type { CommunityMenuElement, CommunityMenuState }
export { defaultMenuElement, communityMenuAtom }
