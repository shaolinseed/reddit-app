import { Flex } from "@chakra-ui/react"
import React from "react"

interface Props {
  children: React.ReactNode
}

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    // parent container
    <Flex justify="center" py="16px" px="0px">
      {/* content container */}
      <Flex width="95%" justify="center" maxWidth="900px">
        {/* Left content */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "66%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* right content */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default PageContent
