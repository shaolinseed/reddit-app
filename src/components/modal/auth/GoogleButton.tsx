import { Button, Flex, Image } from "@chakra-ui/react"
import React from "react"

const GoogleButton: React.FC = () => {
  return (
    <Flex direction="column">
      <Button variant="outline" color="black" borderColor="gray.400" mb={4}>
        <Image src="/images/googlelogo.png" width="20px" mr={4} />
        Continue with Google
      </Button>
    </Flex>
  )
}
export default GoogleButton
