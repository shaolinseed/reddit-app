import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React from "react"

type Props = {
  // user:
}

const SearchInput: React.FC<Props> = () => {
  return (
    //Flex grow uses up remaining space
    <Flex flexGrow="1" mr="2" align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" mb="1" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          _placeholder={{ color: "gray.500" }}
          fontSize="10pt"
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "brand.100",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "brand.100",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
