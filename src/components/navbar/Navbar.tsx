import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import RemainingContent from "./remainingContent/RemainingContent"
import SearchInput from "./SearchInput"

const Navbar: React.FC = () => {
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
