import React, { useState } from "react"
import { Post } from "../../store/postState"
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { NextRouter, useRouter } from "next/router"
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

  onVote: (
    post: Post,
    vote: number,
    communityId: string,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => void
  onDeletePost: (post: Post) => Promise<boolean>
  // only pass onOpenPost if on actual post page (not community or home page)
  onOpenPost?: (post: Post) => void
}

const PostElement: React.FC<Props> = ({
  post,
  isUserAuthor,
  userVoteValue,
  onVote,
  onDeletePost,
  onOpenPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  // if openPost is passed we are on the actual post page
  const actualPostPage = !onOpenPost

  const processDeletePost = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    // prevent double click action on delete button click
    event.stopPropagation()
    setLoadingDelete(true)
    try {
      const success = await onDeletePost(post)

      if (!success) throw new Error("Unable to delete post")

      console.log("Post deleted successfully!")

      //if on actual post page redirect user back to community page
      if (actualPostPage) {
        router.push(`/r/${post.communityId}`)
      }
    } catch (error: any) {
      setError(error.message)
    }

    setLoadingDelete(true)
  }

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderRadius={actualPostPage ? "4px 4px 0px 0px" : "4px"}
      borderColor={actualPostPage ? "white" : "gray.300"}
      _hover={{ borderColor: actualPostPage ? "none" : "gray.400" }}
      cursor={actualPostPage ? "unset" : "pointer"}
      // call onOpenPost if onOpenPost returns true
      onClick={(event) => onOpenPost && onOpenPost(post)}
      borderWidth="2px"
      p="2"
    >
      <Flex
        direction="column"
        align="center"
        bg={actualPostPage ? "none" : "gray.100"}
        p="2"
        width="40px"
        borderRadius={actualPostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          fontSize="24"
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          onClick={(event) => onVote(post, 1, post.communityId, event)}
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
          onClick={(event) => onVote(post, -1, post.communityId, event)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr="2">{error}</Text>
          </Alert>
        )}
        <Stack p="2">
          <Stack direction="row" spacing="0.6" align="center" fontSize="10pt">
            <Text>
              Posted by u/{post.creatorUsername}{" "}
              {moment(new Date(post.timeCreated?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight="700">
            {post.title}
          </Text>
          <Text fontSize="11pt">{post.body}</Text>
          {post.imageUrl && (
            <Flex justify="center" p="2" align="center">
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius="4" />
              )}
              <Image
                maxHeight="475px"
                src={post.imageUrl}
                alt="Post Image"
                onLoad={() => setLoadingImage(false)}
                display={loadingImage ? "none" : "unset"}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml="1" mb={0.5} color="gray.500" fontWeight="600">
          <Flex
            align="center"
            py="8px"
            px="10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr="2" />
            <Text fontSize="10pt" ml="0" _focus={{ outline: "none" }}>
              {post.commentCount}
            </Text>
          </Flex>
          <Flex
            align="center"
            py="8px"
            px="10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr="2" fontSize="20" />
            <Text fontSize="10pt" ml="0">
              Share
            </Text>
          </Flex>
          <Flex
            align="center"
            py="8px"
            px="10px"
            borderRadius="4"
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr="2" fontSize="19" />
            <Text fontSize="10pt" ml="0">
              {post.commentCount}
            </Text>
          </Flex>
          {/* display delete option if user is author */}
          {isUserAuthor && (
            <Flex
              align="center"
              py="8px"
              px="10px"
              borderRadius="4"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={processDeletePost}
            >
              {loadingDelete ? (
                <Spinner size="s" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default PostElement
