import { Button, Center, Divider, Flex, Input, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { authModalAtom } from "../../../atoms/authModalState"
import GoogleButton from "./GoogleButton"

const CreateAccount: React.FC = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  const [createAccountFrm, setCreateAccountFrm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const onSubmit = () => {
    console.log("yo")
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
      <form>
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

        <Button type="submit" width="100%" height="38px" mt="2" mb="2">
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
