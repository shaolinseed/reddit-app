import { Text, Button, Flex, Textarea } from "@chakra-ui/react"
import { User } from "firebase/auth"
import React from "react"
import AuthButtons from "../../navbar/remainingContent/AuthButtons"

type Props = {
  user: User
  commentText: string
  setCommentText: (value: string) => void
  createLoading: boolean
  processCreateComment: (commentText: string) => void
}

const CommentInput: React.FC<Props> = ({
  user,
  commentText,
  setCommentText,
  createLoading,
  processCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb="1" ml="1">
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user?.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            fontSize="10pt"
            borderRadius={4}
            placeholder="Add a comment"
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
            }}
            focusBorderColor="pink.200"
          />
          <Flex
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            p="6px 8px"
          >
            <Button
              disabled={!commentText}
              height="30px"
              isLoading={createLoading}
              onClick={() => processCreateComment(commentText)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  )
}
export default CommentInput
