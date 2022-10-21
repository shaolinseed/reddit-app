import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { User } from "firebase/auth"
import React from "react"

type Props = {
  user?: User | null
}

const SearchInput: React.FC<Props> = ({ user }) => {
  return (
    //Flex grow uses up remaining space
    <Flex flexGrow="1" mx="2" align="center" maxWidth={user ? "auto" : "600px"}>
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
          borderRadius="20px"
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
