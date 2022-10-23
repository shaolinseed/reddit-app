import { Button, Center, Divider, Flex, Input, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { authModalAtom } from "../../../store/authModalState"
import GoogleButton from "./GoogleButton"
import { auth } from "../../../firebase/clientApp"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { firebaseErrors } from "../../../firebase/errors"

const CreateAccount: React.FC = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  const [createAccountFrm, setCreateAccountFrm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usecreateuserwithemailandpassword
  const [createUserWithEmailAndPassword, user, loading, createAccountError] =
    useCreateUserWithEmailAndPassword(auth)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent form from refreshing page
    event.preventDefault()
    // reset error
    if (error) setError("")

    // If passwords match
    if (createAccountFrm.password === createAccountFrm.confirmPassword) {
      createUserWithEmailAndPassword(
        createAccountFrm.email,
        createAccountFrm.password
      )
    } else {
      setError("Passwords do not match")
    }
  }
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAccountFrm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <GoogleButton />
      <Divider
        borderColor={"gray.400"}
        width="340px"
        borderEndRadius={10}
        borderWidth="1px"
        mb={6}
      />
      <form onSubmit={onSubmit}>
        <Input
          fontSize="11pt"
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
        />
        <Input
          required
          fontSize="11pt"
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
        />
        <Input
          required
          fontSize="11pt"
          name="confirmPassword"
          placeholder="Confirm Password"
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
        />
        {(error || createAccountError) && (
          <Text textAlign="center" color="red" fontSize="10pt">
            {error ||
              firebaseErrors[
                createAccountError?.message as keyof typeof firebaseErrors
              ]}
          </Text>
        )}
        <Button
          type="submit"
          width="100%"
          height="38px"
          mt="2"
          mb="2"
          isLoading={loading}
        >
          Create Account
        </Button>
        <Flex fontSize="10pt" justifyContent="center">
          <Text mr={1}>Already have an account?</Text>
          <Text
            color="brand.100"
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
      </form>
    </>
  )
}
export default CreateAccount
