import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react"
import { User } from "firebase/auth"
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
  Timestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { firestoreInstance } from "../../../firebase/clientApp"
import { Post, postsAtom } from "../../../store/postState"
import CommentElement from "./CommentElement"
import CommentInput from "./CommentInput"

type Comment = {
  id: string
  creatorId: string
  creatorUsername: string
  communityId: string
  postId: string
  postTitle: string
  text: string
  timeCreated: Timestamp
}

type Props = {
  user: User
  openPost: Post | null
  communityId: string
}

const Comments: React.FC<Props> = ({ user, openPost, communityId }) => {
  const [commentText, setCommentText] = useState("")
  const [postComments, setPostComments] = useState<Comment[]>([])
  const [getLoading, setGetLoading] = useState(true)
  const [, setPosts] = useAtom(postsAtom)
  const [loadingDeleteId, setLoadinngDeleteId] = useState("")
  const [createLoading, setCreateLoading] = useState(false)

  useEffect(() => {
    if (openPost) {
      getPostComments()
    } else {
      return
    }
  }, [openPost])

  const processCreateComment = async (commentText: string) => {
    setCreateLoading(true)
    // Batch writes help maintain data integrity
    // if any operation fails all fail
    try {
      const batch = writeBatch(firestoreInstance)
      const commentDocRef = doc(collection(firestoreInstance, "comments"))

      const createdComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorUsername: user.email!.split("@")[0],
        communityId: communityId,
        postId: openPost?.id!,
        postTitle: openPost?.title!,
        text: commentText,
        timeCreated: serverTimestamp() as Timestamp,
      }

      // add created comment to batch
      batch.set(commentDocRef, createdComment)

      createdComment.timeCreated = { seconds: Date.now() / 1000 } as Timestamp
      // increment post comment count
      const postDocRef = doc(firestoreInstance, "posts", openPost?.id as string)

      batch.update(postDocRef, {
        commentCount: increment(1),
      })

      // submit changes to DB
      await batch.commit()

      //update comments state
      setPostComments((prev) => [createdComment, ...prev])

      // update UI
      setPosts((prev) => ({
        ...prev,
        openPost: {
          ...prev.openPost,
          commentCount: prev.openPost?.commentCount! + 1,
        } as Post,
      }))
    } catch (error) {}
    setCreateLoading(false)
  }

  const processDeleteComment = async (comment: Comment) => {
    setLoadinngDeleteId(comment.id)

    try {
      const batch = writeBatch(firestoreInstance)

      const commentDocRef = doc(firestoreInstance, "comments", comment.id)

      //add delete operation
      batch.delete(commentDocRef)

      const postDocRef = doc(firestoreInstance, "posts", openPost?.id!)

      // decrement the comment count in DB
      batch.update(postDocRef, {
        commentCount: increment(-1),
      })

      // send changes to DB
      await batch.commit()

      // decrement the comment count for UI
      setPosts((prev) => ({
        ...prev,
        openPost: {
          ...prev.openPost,
          commentCount: prev.openPost?.commentCount! - 1,
        } as Post,
      }))

      setPostComments((prev) =>
        prev.filter((element) => element.id !== comment.id)
      )
    } catch (error) {
      console.log(error)
    }
    setLoadinngDeleteId("")
  }
  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestoreInstance, "comments"),
        where("postId", "==", openPost?.id),
        orderBy("timeCreated", "desc")
      )
      const commentDocs = await getDocs(commentsQuery)
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log(comments)

      setPostComments(comments as Comment[])
    } catch (error) {
      console.log("getPostComments error", error)
      return false
    }
    setGetLoading(false)
  }
  return (
    <Box p="2" bg="white" borderRadius="0px 2px 4px 4px">
      <Flex
        direction="column"
        width="100%"
        pl="10"
        pr="4"
        mb="6"
        fontSize="11pt"
      >
        <CommentInput
          user={user}
          commentText={commentText}
          setCommentText={setCommentText}
          createLoading={createLoading}
          processCreateComment={processCreateComment}
        />
      </Flex>
      <Stack spacing="6" padding="2">
        {getLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {postComments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {postComments.map((element) => (
                  <CommentElement
                    key={element.id}
                    comment={element}
                    processDeleteComment={processDeleteComment}
                    loadingDelete={loadingDeleteId === element.id}
                    userId={user.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  )
}
export default Comments
export type { Comment }
