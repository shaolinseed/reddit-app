import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
} from "@chakra-ui/react"
import { signOut, User } from "firebase/auth"
import React from "react"
import { FaRedditSquare } from "react-icons/fa"
import { IoChevronDown, IoSparkles } from "react-icons/io5"
import { VscAccount } from "react-icons/vsc"
import { CgProfile } from "react-icons/cg"
import { MdLogout, MdOutlineLogin } from "react-icons/md"
import { auth } from "../../../firebase/clientApp"
import { useAtom } from "jotai"
import { authModalAtom } from "../../../store/authModalState"
import { useResetAtom } from "jotai/utils"
import { communityAtom } from "../../../store/communityState"

type Props = {
  user?: User | null
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [, setAuthModalState] = useAtom(authModalAtom)

  const logOut = async () => {
    await signOut(auth)
  }

  return (
    <Menu>
      <MenuButton
        borderRadius={4}
        py="0px"
        px="6px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize="24"
                  mr={1}
                  color="brand.200"
                />

                <Flex
                  direction="column"
                  display={{ base: "none", md: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight="700">
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.600">1 Karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} color="brand.100" />
            )}
          </Flex>
          <IoChevronDown fontSize={15} />
        </Flex>
      </MenuButton>
      <MenuList color="brand.200" padding={2}>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "gray.50" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize="20" mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider my={1} />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "gray.50" }}
              onClick={logOut}
            >
              <Flex align="center">
                <Icon as={MdLogout} fontSize="20" mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "gray.50" }}
              onClick={() => setAuthModalState({ open: true, view: "logIn" })}
            >
              <Flex align="center">
                <Icon as={MdLogout} fontSize="20" mr={2} />
                Log In | Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}
export default UserMenu
