import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi"
type CreateCommunityModalProps = {
  open: boolean
  closeModal: () => void
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  closeModal,
}) => {
  const [communityName, setCommunityName] = useState("")
  const [charactersRemaining, setCharactersRemaining] = useState(21)
  const [communityType, setCommunityType] = useState("public")

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) {
      return
    }
    setCommunityName(event.target.value)
    setCharactersRemaining(21 - event.target.value.length)
  }

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name)
  }

  return (
    <>
      <Modal isOpen={open} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column" p={3}>
            Create a Community
          </ModalHeader>
          <Box px="3">
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text
                position="relative"
                width="20px"
                top="28px"
                left="10px"
                color="gray.500"
              >
                r/
              </Text>
              <Input
                value={communityName}
                size="sm"
                pl="22px"
                position="relative"
                onChange={onInputChange}
              />
              <Text
                mt="1"
                fontSize="9pt"
                color={charactersRemaining == 0 ? "red" : "gray.500"}
              >
                {charactersRemaining} Characters remaining...
              </Text>
              <Box my="4">
                <Text fontWeight="600" fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing="2">
                  <Checkbox
                    colorScheme="pink"
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr="2" />

                      <Text fontSize="11pt" mr="1">
                        Public
                      </Text>
                      <Text fontSize="9pt" color="gray.500" pt="1" ml="1">
                        Anyone can view, post and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                    colorScheme="pink"
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr="2" />

                      <Text fontSize="11pt" mr="1">
                        Restricted
                      </Text>
                      <Text fontSize="9pt" color="gray.500" pt="1" ml="1">
                        Anyone can view the community but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                    colorScheme="pink"
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr="2" />

                      <Text fontSize="11pt" mr="1">
                        Private
                      </Text>
                      <Text fontSize="9pt" color="gray.500" pt="1" ml="1">
                        Only approved users can view and contribute to to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={closeModal}
              variant="outline"
            >
              Cancel
            </Button>
            <Button bgColor="brand.100" onClick={() => {}}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal
