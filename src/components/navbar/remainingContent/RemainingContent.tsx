import { Flex } from "@chakra-ui/react"
import React from "react"
import AuthModal from "../../modal/auth/AuthModal"
import AuthButtons from "./AuthButtons"

type Props = {}

const RemainingContent: React.FC<Props> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  )
}
export default RemainingContent
