import { Button, Divider, Flex, Input, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { authModalAtom } from "../../../atoms/authModalState"
import GoogleButton from "./GoogleButton"

type LogInProps = {}

const LogIn: React.FC<LogInProps> = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  const [, setLoginFrm] = useState({
    email: "",
    password: "",
  })

  const onSubmit = () => {
    // console.log("yo")
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
      <form>
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

        <Button type="submit" width="100%" height="38px" mt="2" mb="2">
          Log In
        </Button>
        <Flex fontSize="10pt" justifyContent="center">
          <Text mr={1}>Don&#39;t have an account?</Text>
          <Text
            color="brand.100"
            fontWeight="700"
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "signUp",
              }))
            }}
          >
            Create Account
          </Text>
        </Flex>
      </form>
    </>
  )
}
export default LogIn
