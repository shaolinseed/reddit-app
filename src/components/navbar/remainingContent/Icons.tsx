import { Flex, Icon } from "@chakra-ui/react"
import React from "react"

import {
  BsArrowUpRightCircle,
  BsBell,
  BsChatDots,
  BsCoin,
  BsPlusCircle,
} from "react-icons/bs"

import { IoIosAdd } from "react-icons/io"

const Icons: React.FC = () => {
  return (
    <Flex alignItems="center" flexGrow={1}>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={22} color="brand.100" />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={BsCoin} color="brand.100" fontSize={22} />
        </Flex>
      </Flex>
      <>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={BsChatDots} color="brand.100" fontSize={20} />
        </Flex>
        <Flex
          mx={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={BsBell} color="brand.100" fontSize={20} />
        </Flex>
        <Flex
          mx={1}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.100" }}
          display={{ base: "none", md: "flex" }}
        >
          <Icon as={BsPlusCircle} color="brand.100" fontSize={21} />
        </Flex>
      </>
    </Flex>
  )
}
export default Icons
