import { Button, Flex } from "@chakra-ui/react"
import React from "react"
import Link from "next/link"

type Props = {}

const NotFound: React.FC<Props> = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Sorry that community doesn&#39;t exist or is banned
      <Link href="/">
        <Button mt={2}>Return Home</Button>
      </Link>
    </Flex>
  )
}
export default NotFound
