import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react"
import moment from "moment"
import React from "react"
import { FaReddit } from "react-icons/fa"
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5"

import { Comment } from "./Comments"

type Props = {
  comment: Comment
  processDeleteComment: (comment: Comment) => void
  loadingDelete: boolean
  // userId passed to check if user is the author of the comment
  userId: string
}

const CommentElement: React.FC<Props> = ({
  comment,
  processDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box mr="2">
        <Icon fontSize="28" color="gray.400" as={FaReddit} />
      </Box>
      <Stack>
        <Stack align="center" direction="row" fontSize="10pt">
          <Text fontWeight="700">{comment.creatorUsername}</Text>
          <Text color="gray.600">
            {moment(new Date(comment.timeCreated?.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="xs" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack cursor="pointer" direction="row" align="center" spacing="2">
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          <>
            <Text fontSize="10pt" _hover={{ color: "pink.500" }}>
              Edit
            </Text>
            <Text
              onClick={() => processDeleteComment(comment)}
              fontSize="10pt"
              _hover={{ color: "pink.500" }}
            >
              Delete
            </Text>
          </>
        </Stack>
      </Stack>
    </Flex>
  )
}
export default CommentElement
