import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react"
import { useAtom } from "jotai"
import React from "react"
import { IoChevronDown } from "react-icons/io5"
import { authModalAtom } from "../../../store/authModalState"
import { TiHome } from "react-icons/ti"
import Communities from "./Communities"
import useFeatures from "../../../hooks/useFeatures"

const UserMenu: React.FC = () => {
  const { communityMenu, toggleMenuOpen } = useFeatures()

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
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {communityMenu.selectedMenuElement.imageUrl ? (
              <Image
                borderRadius="full"
                boxSize="24px"
                mr="2"
                src={communityMenu.selectedMenuElement.imageUrl}
                alt="Community Image"
              />
            ) : (
              <Icon
                as={communityMenu.selectedMenuElement.icon}
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                color={communityMenu.selectedMenuElement.iconColor}
              />
            )}

            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="11pt" color="brand.100">
                {communityMenu.selectedMenuElement.communityName}
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
