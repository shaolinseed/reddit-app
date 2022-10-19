import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React from "react"

type Props = {
  user: any
}

const SearchInput: React.FC<Props> = ({ user }) => {
  return (
    //Flex grow uses up remaining space
    <Flex flexGrow="1" mr="2" align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" mb="1" />
        </InputLeftElement>
        <Input
          focusBorderColor="pink.200"
          placeholder="Search..."
          _placeholder={{ color: "gray.500" }}
          fontSize="10pt"
          _hover={{
            bg: "white",
          }}
          _focus={{
            outline: "none",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
