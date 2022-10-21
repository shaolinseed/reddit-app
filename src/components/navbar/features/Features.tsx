import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"
import { IoChevronDown } from "react-icons/io5"
import { authModalAtom } from "../../../atoms/authModalState"
import { TiHome } from "react-icons/ti"
import Communities from "./Communities"

const UserMenu: React.FC = () => {
  const [, setAuthModalState] = useAtom(authModalAtom)
  return (
    <Menu>
      <MenuButton
        mr="2"
        ml="2"
        borderRadius="4"
        py="0px"
        px="6px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon
              as={TiHome}
              color="brand.100"
              fontSize={24}
              mr={{ base: 1, md: 2 }}
            />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="11pt" color="brand.100">
                Home
              </Text>
            </Flex>
          </Flex>
          <Icon as={IoChevronDown} fontSize="14" color="brand.200" />
        </Flex>
      </MenuButton>
      <MenuList color="brand.200" padding={2}>
        <Communities />
      </MenuList>
    </Menu>
  )
}
export default UserMenu
