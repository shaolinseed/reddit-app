import { Flex, Icon, MenuItem, Box, Text, MenuList } from "@chakra-ui/react"
import React, { useState } from "react"
import CreateCommunityModal from "../../modal/community/CreateCommunityModal"
import { BsPlusCircle } from "react-icons/bs"
import { userSnippetsAtom } from "../../../store/communityState"
import { useAtom } from "jotai"
import MenuListItem from "./MenuListElement"
import MenuListElement from "./MenuListElement"
import { FaReddit } from "react-icons/fa"

type CommunitiesProps = {}

const Communities: React.FC<CommunitiesProps> = () => {
  const userSnippets = useAtom(userSnippetsAtom)

  const [open, setOpen] = useState(false)
  return (
    <>
      <CreateCommunityModal open={open} closeModal={() => setOpen(false)} />
      <Box my="2">
        <Text pl="3" fontSize="8pt" fontWeight="500" color="gray.500">
          Moderating
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.50" }}
          _focus={{ bg: "gray.50" }}
          onClick={() => setOpen(true)}
          bgColor="white"
        ></MenuItem>
        {userSnippets[0]
          .filter((element) => element.isModerator)
          .map((element) => (
            <MenuListElement
              key={element.communityId}
              icon={FaReddit}
              link={`/r/${element.communityId}`}
              imageUrl={element.imageUrl}
              iconColor="brand.100"
              communityName={element.communityId}
            />
          ))}
      </Box>
      <Box my="3">
        <Text pl="3" fontSize="8pt" fontWeight="500" color="gray.500" mb="2">
          My Communities
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.50" }}
          _focus={{ bg: "gray.50" }}
          onClick={() => setOpen(true)}
          bgColor="white"
        >
          <Flex fontWeight="600" fontSize="10pt">
            <Icon as={BsPlusCircle} fontSize="20" mr="2" />
            Create community
          </Flex>
        </MenuItem>
        {userSnippets[0].map((element) => (
          <MenuListElement
            key={element.communityId}
            icon={FaReddit}
            link={`/r/${element.communityId}`}
            imageUrl={element.imageUrl}
            iconColor="brand.100"
            communityName={element.communityId}
          />
        ))}
      </Box>
    </>
  )
}
export default Communities
