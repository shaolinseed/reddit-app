import { Flex, Icon, MenuItem } from "@chakra-ui/react"
import React, { useState } from "react"
import CreateCommunityModal from "../../modal/community/CreateCommunityModal"
import { BsPlusCircle } from "react-icons/bs"

type CommunitiesProps = {}

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CreateCommunityModal open={open} closeModal={() => setOpen(false)} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.50" }}
        _focus={{ bg: "gray.50" }}
        onClick={() => setOpen(true)}
        bgColor="white"
      >
        <Flex>
          <Icon as={BsPlusCircle} fontSize="20" mr="2" />
          Create community
        </Flex>
      </MenuItem>
    </>
  )
}
export default Communities
