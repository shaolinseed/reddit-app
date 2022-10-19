import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { authModalAtom } from "../../../atoms/authModalState"
import { auth } from "../../../firebase/clientApp"
import AuthInputs from "./AuthInputs."

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalAtom)
  const [user, loading, userError] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      closeModal()
      console.log(user)
    }
  }, [user])

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" pb={0}>
            {modalState.view === "logIn" && "Log In"}
            {modalState.view === "createAccount" && "Create Account"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb="6"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              <AuthInputs />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
