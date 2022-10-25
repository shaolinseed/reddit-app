import { Flex, Icon, Input } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BsLink45Deg } from "react-icons/bs"
import { FaReddit } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"
import { auth } from "../../../firebase/clientApp"
import useFeatures from "../../../hooks/useFeatures"
import { authModalAtom } from "../../../store/authModalState"

const CreatePostLink: React.FC = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [, setAuthModal] = useAtom(authModalAtom)

  const { toggleMenuOpen } = useFeatures()

  const onClick = () => {
    if (!user) {
      setAuthModal({
        open: true,
        view: "logIn",
      })
      return
    }

    const { communityName } = router.query

    if (communityName) {
      // send to submit page
      router.push(`/r/${communityName}/submit`)
      return
    }

    toggleMenuOpen()
  }

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  )
}
export default CreatePostLink
