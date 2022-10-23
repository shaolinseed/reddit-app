import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { authModalAtom } from "../../../store/authModalState"
import GoogleButton from "./GoogleButton"
import { auth } from "../../../firebase/clientApp"
import { firebaseErrors } from "../../../firebase/errors"
type LogInProps = {}

const LogIn: React.FC<LogInProps> = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  const [logInFrm, setLoginFrm] = useState({
    email: "",
    password: "",
  })

  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(auth)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log("yo")
    signInWithEmailAndPassword(logInFrm.email, logInFrm.password)
  }
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFrm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <GoogleButton />
      <Divider
        borderColor={"gray.300"}
        width="320px"
        borderEndRadius={10}
        borderWidth="1px"
        mb={6}
      />
      <form onSubmit={onSubmit}>
        <Input
          required
          name="email"
          placeholder="Email"
          type="email"
          mb="2"
          onChange={onChange}
          bg="gray.50"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "pink.300",
          }}
          focusBorderColor="pink.400"
          fontSize="11pt"
        />
        <Input
          required
          name="password"
          placeholder="Password"
          type="password"
          mb="2"
          onChange={onChange}
          bg="gray.50"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "pink.300",
          }}
          focusBorderColor="pink.400"
          fontSize="11pt"
        />
        <Text textAlign="center" color="red" fontSize="10pt">
          {firebaseErrors[signInError?.message as keyof typeof firebaseErrors]}
        </Text>
        <Button
          type="submit"
          width="100%"
          height="38px"
          mt="2"
          mb="2"
          isLoading={loading}
        >
          Log In
        </Button>
        <Flex fontSize="10pt" justifyContent="center" direction="row">
          <Text mr={1}>Don&#39;t have an account?</Text>
          <Text
            color="brand.100"
            fontWeight="700"
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "createAccount",
              }))
            }}
          >
            Create Account
          </Text>
        </Flex>
        <Flex mt={2} fontSize="9pt" justifyContent="center" direction="row">
          <Text mr={1}>Forgot your password?</Text>
          <Text
            color="brand.300"
            fontWeight="700"
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "resetPassword",
              }))
            }}
          >
            Reset
          </Text>
        </Flex>
      </form>
    </>
  )
}
export default LogIn
