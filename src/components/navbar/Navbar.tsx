import { Flex, Image } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"

import RemainingContent from "./remainingContent/RemainingContent"
import SearchInput from "./SearchInput"
import { authModalAtom } from "../../atoms/authModalState"

const Navbar: React.FC = () => {
  const [stakeAddress, setStakeAddress] = useAtom(authModalAtom)
  console.log(stakeAddress)

  return (
    <Flex bg="white" height="44px" py="6px" px="12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" height="30px" alt="" />
        <Image
          src="/images/redditText.svg"
          alt=""
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      <RemainingContent />
      {/* <Directory />
      <SearchInput />
      <RightContent /> */}
    </Flex>
  )
}
export default Navbar
