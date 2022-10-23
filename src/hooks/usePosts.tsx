import { useAtom } from "jotai"
import React from "react"
import { postsAtom } from "../store/postState"

/**
 * usePosts hook to enable common post interaction functionality
 * across multiple pages
 */
const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)

  const onVote = async () => {}
  const onOpenPost = async () => {}
  const onDeletePost = async () => {}

  return {
    posts,
    setPosts,
    onVote,
    onOpenPost,
    onDeletePost,
  }
}
export default usePosts
