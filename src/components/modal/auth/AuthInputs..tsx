import { Flex, Modal } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"
import { authModalAtom } from "../../../atoms/authModalState"
import LogIn from "./LogIn"
import CreateAccount from "./CreateAccount"

type Props = {}

const AuthInputs: React.FC<Props> = () => {
  const [authModalState] = useAtom(authModalAtom)
  return (
    <Flex direction="column" align="center" width="100%" mt="4">
      {authModalState.view === "logIn" && <LogIn />}
      {authModalState.view === "signUp" && <CreateAccount />}
    </Flex>
  )
}
export default AuthInputs
