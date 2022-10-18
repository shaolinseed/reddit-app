import { Button } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"
import { authModalAtom } from "../../../atoms/authModalState"

const AuthButtons: React.FC = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "logIn" })}
      >
        Log In
      </Button>

      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signUp" })}
      >
        Sign Up
      </Button>
    </>
  )
}
export default AuthButtons
