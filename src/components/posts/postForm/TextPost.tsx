import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react"
import React from "react"
import { PostContent } from "../NewPostFrm"

type Props = {
  textInputs: PostContent
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onCreatePost: () => void
  loading: boolean
}

const TextPost: React.FC<Props> = ({
  textInputs,
  onChange,
  onCreatePost,
  loading,
}) => {
  return (
    <Stack spacing="3" width="100%">
      <Input
        fontSize="10pt"
        borderRadius="4"
        name="title"
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", border: "1px solid black" }}
        value={textInputs.title}
        onChange={onChange}
      />
      <Textarea
        height="160px"
        fontSize="10pt"
        borderRadius="4"
        name="body"
        placeholder="Post content"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", border: "1px solid black" }}
        value={textInputs.body}
        onChange={onChange}
      />
      <Flex justify="flex-end">
        <Button
          height="36px"
          px="30px"
          py="0px"
          isLoading={loading}
          disabled={!textInputs.title}
          onClick={onCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  )
}
export default TextPost
