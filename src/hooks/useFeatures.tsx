import { useAtom } from "jotai"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { FaReddit } from "react-icons/fa"
import {
  communityMenuAtom,
  CommunityMenuElement,
} from "../store/communityMenuState"
import { communityAtom } from "../store/communityState"

const useFeatures = () => {
  const router = useRouter()
  const [communityMenu, setCommunityMenu] = useAtom(communityMenuAtom)
  const community = useAtom(communityAtom)

  // if user is refreshing or visiting page for first time
  useEffect(() => {
    const { currentCommunity } = community[0]

    if (currentCommunity) {
      setCommunityMenu((prev) => ({
        ...prev,
        selectedMenuElement: {
          communityName: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageUrl: currentCommunity.imageUrl,
          icon: FaReddit,
          iconColor: "brand.100",
        },
      }))
    }
  }, [community[0].currentCommunity])

  // turn menu visibility on and off
  const toggleMenuOpen = () => {
    setCommunityMenu((prev) => ({
      ...prev,
      isOpen: !communityMenu.isOpen,
    }))
  }

  const onMenuElementClick = (menuElement: CommunityMenuElement) => {
    setCommunityMenu((prev) => ({
      ...prev,
      selectedMenuElement: menuElement,
    }))

    // redirect user to community selected
    router.push(menuElement.link)

    // close menu
    if (communityMenu.isOpen) {
      toggleMenuOpen()
    }
  }

  return {
    communityMenu,
    toggleMenuOpen,
    onMenuElementClick,
  }
}
export default useFeatures
