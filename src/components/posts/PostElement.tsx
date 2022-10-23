import React from "react"
import { Post } from "../../store/postState"
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { NextRouter } from "next/router"
import { AiOutlineDelete } from "react-icons/ai"
import { BsChat, BsDot } from "react-icons/bs"
import { FaReddit } from "react-icons/fa"
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5"
import Link from "next/link"
import moment from "moment"

type Props = {
  post: Post
  isUserAuthor: boolean
  userVoteValue?: number
  onVote: () => void
  onDeletePost: () => void
  onOpenPost: () => void
}

const PostElement: React.FC<Props> = ({
  post,
  isUserAuthor,
  userVoteValue,
  onVote,
  onDeletePost,
  onOpenPost,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius="4"
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onOpenPost}
      p="2"
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p="2"
        width="40px"
        borderRadius="4"
      >
        <Icon
          fontSize="24"
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          onClick={onVote}
          cursor="pointer"
        />
        <Text fontSize="10pt">{post.voteStatus}</Text>
        <Icon
          fontSize="24"
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          onClick={onVote}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack p="2">
          <Stack direction="row" spacing="0.6" align="center" fontSize="10pt">
            <Text>
              Posted by u/{post.creatorUsername}{" "}
              {moment(new Date(post.timeCreated?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight="600">
            {post.title}
          </Text>
          {post.imageUrl && (
            <Flex justify="center" p="2">
              <Image src={post.imageUrl} />
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  )
}
export default PostElement
