import { Button, Flex } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import React from "react"
import { auth } from "../../../firebase/clientApp"
import AuthModal from "../../modal/auth/AuthModal"
import AuthButtons from "./AuthButtons"

type Props = {
  user: any
}

const RemainingContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>Log Out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  )
}
export default RemainingContent
