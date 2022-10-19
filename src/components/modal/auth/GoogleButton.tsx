import { Button, Flex, Image, Text } from "@chakra-ui/react"
import React from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/clientApp"
const GoogleButton: React.FC = () => {
  const [signInWithGoogle, user, loading, signInError] =
    useSignInWithGoogle(auth)
  return (
    <Flex direction="column">
      <Button
        variant="outline"
        color="black"
        borderColor="gray.400"
        mb={4}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image src="/images/googlelogo.png" width="20px" mr={4} />
        Continue with Google
      </Button>
      {signInError && <Text>{signInError.message}</Text>}
    </Flex>
  )
}
export default GoogleButton
