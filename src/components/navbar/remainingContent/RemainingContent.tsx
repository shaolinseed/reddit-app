import { Button, Flex } from "@chakra-ui/react"
import { signOut, User } from "firebase/auth"
import React from "react"
import { auth } from "../../../firebase/clientApp"
import AuthModal from "../../modal/auth/AuthModal"
import AuthButtons from "./AuthButtons"
import Icons from "./Icons"
import UserMenu from "./UserMenu"

type Props = {
  user?: User | null
}

const RemainingContent: React.FC<Props> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
        {/* <Menu /> */}
      </Flex>
    </>
  )
}
export default RemainingContent
