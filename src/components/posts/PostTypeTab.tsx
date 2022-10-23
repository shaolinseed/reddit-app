import { Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { PostTypeTab } from "./NewPostFrm"

type Props = {
  tab: PostTypeTab
  open: boolean
  setOpenTab: (name: string) => void
}

const PostTypeTab: React.FC<Props> = ({ tab, open, setOpenTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow="1"
      py="14px"
      px="0px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={open ? "brand.100" : "gray.500"}
      borderWidth={open ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={open ? "brand.300" : "gray.300"}
      borderRightColor="gray.300"
      onClick={() => setOpenTab(tab.title)}
      fontWeight="700"
    >
      <Flex align="center" height="20px" mr="2">
        <Icon as={tab.icon} />
      </Flex>
      <Text fontSize="10pt">{tab.title}</Text>
    </Flex>
  )
}
export default PostTypeTab
