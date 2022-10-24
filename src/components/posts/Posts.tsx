import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Community } from "../../store/communityState"
import { auth, firestoreInstance, storage } from "../../firebase/clientApp"
import usePosts from "../../hooks/usePosts"
import { Post } from "../../store/postState"
import PostElement from "./PostElement"
import { useAuthState } from "react-firebase-hooks/auth"
import { Stack } from "@chakra-ui/react"
import PostLoader from "./PostLoader"

type Props = {
  communityData: Community
  userId?: string
}

const Posts: React.FC<Props> = ({ communityData }) => {
  const [user] = useAuthState(auth)

  // Extract functions from usePosts hook
  const { posts, setPosts, onVote, onOpenPost, onDeletePost } = usePosts()
  const [loading, setLoading] = useState(false)

  const getPosts = async () => {
    setLoading(true)

    try {
      // Query to find posts in current community (descending order)
      const postsQuery = query(
        collection(firestoreInstance, "posts"),
        // filter community to current community
        where("communityId", "==", communityData.id),
        // order most recent first
        orderBy("timeCreated", "desc")
      )

      // store result of query
      const postDocs = await getDocs(postsQuery)

      // create js objects from posts data array
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // store posts in jotai atom
      setPosts((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))

      console.log("posts", posts)
    } catch (error: any) {
      console.log("getPosts erorr: ", error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {posts.posts.map((element) => (
            <PostElement
              post={element}
              isUserAuthor={user?.uid === element.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onOpenPost={onOpenPost}
              onDeletePost={onDeletePost}
              key={element.id}
            />
          ))}
        </Stack>
      )}
    </>
  )
}
export default Posts
