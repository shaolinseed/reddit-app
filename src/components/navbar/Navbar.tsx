import { Flex, Image } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"

import RemainingContent from "./remainingContent/RemainingContent"
import SearchInput from "./SearchInput"
import { authModalAtom } from "../../store/authModalState"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/clientApp"
import Features from "./features/Features"
import useFeatures from "../../hooks/useFeatures"
import { defaultMenuElement } from "../../store/communityMenuState"

const Navbar: React.FC = () => {
  const [user, loading, userError] = useAuthState(auth)

  const { onMenuElementClick } = useFeatures()

  return (
    <Flex
      bg="white"
      height="44px"
      py="6px"
      px="12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        cursor="pointer"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onMenuElementClick(defaultMenuElement)}
      >
        <Image src="/images/redditFace.svg" height="30px" alt="" />
        <Image
          src="/images/redditText.svg"
          alt=""
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Features />}
      <SearchInput user={user} />
      <RemainingContent user={user} />
    </Flex>
  )
}
export default Navbar
