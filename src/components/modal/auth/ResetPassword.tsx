import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth"
import { authModalAtom } from "../../../atoms/authModalState"
import GoogleButton from "./GoogleButton"
import { auth } from "../../../firebase/clientApp"
import { firebaseErrors } from "../../../firebase/errors"
type LogInProps = {}

const ResetPassword: React.FC<LogInProps> = () => {
  const [completed, setCompleted] = useState(false)
  const [email, setEmail] = useState("")
  const [, setAuthModalState] = useAtom(authModalAtom)

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await sendPasswordResetEmail(email)
    setCompleted(true)
  }

  return (
    <>
      {completed ? (
        <>
          <Text mb="1" align="center">
            Password reset link sent to {email}
          </Text>
          <Text mb="1" align="center" fontWeight="200" fontSize="10pt">
            Please check your spam
          </Text>
        </>
      ) : (
        <>
          <Text align="center" fontSize="11pt" mb={2}>
            Enter your email and we&#39;ll send you a link to recover your
            password
          </Text>
          <Divider
            borderColor={"gray.300"}
            width="370px"
            borderEndRadius={10}
            borderWidth="1px"
            mb={4}
          />
          <form onSubmit={onSubmit}>
            <Input
              required
              name="email"
              placeholder="Email"
              type="email"
              mb="2"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              bg="gray.50"
              _placeholder={{ color: "gray.500" }}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "pink.300",
              }}
              focusBorderColor="pink.400"
              fontSize="11pt"
              width="300px"
            />

            {/* <Text textAlign="center" color="red" fontSize="10pt">
              {
                firebaseErrors[
                  signInError?.message as keyof typeof firebaseErrors
                ]
              }
            </Text> */}
            <Button
              type="submit"
              width="100%"
              height="38px"
              mt="2"
              mb="2"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Divider
        borderColor={"gray.300"}
        width="320px"
        borderEndRadius={10}
        borderWidth="1px"
        mb={4}
        mt={4}
      />
      <Flex fontSize="10pt" justifyContent="center">
        <Text
          color="brand.200"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "createAccount",
            }))
          }}
          mb={2}
        >
          Create Account
        </Text>
      </Flex>

      <Flex fontSize="10pt" justifyContent="center">
        <Text
          color="brand.200"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "logIn",
            }))
          }}
        >
          Log In
        </Text>
      </Flex>
    </>
  )
}
export default ResetPassword
