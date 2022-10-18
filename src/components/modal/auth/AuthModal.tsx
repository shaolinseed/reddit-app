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
import React from "react"
import { authModalAtom } from "../../../atoms/authModalState"
import AuthInputs from "./AuthInputs."

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalAtom)

  const onClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" pb={0}>
            {modalState.view === "logIn" && "Log In"}
            {modalState.view === "signUp" && "Create Account"}
            {modalState.view === "resetPassword" && "Login"}
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
