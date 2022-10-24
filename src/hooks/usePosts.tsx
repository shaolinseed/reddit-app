import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useAtom } from "jotai"
import React from "react"
import { firestoreInstance, storage } from "../firebase/clientApp"
import { Post, postsAtom } from "../store/postState"

/**
 * usePosts hook to enable common post interaction functionality
 * across multiple pages
 */
const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)

  const onVote = async () => {}
  const onOpenPost = async () => {}
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // if post contains image
      if (post.imageUrl) {
        // delete image from firestore

        const fileRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(fileRef)
      }
      // delete post doc from firestore
      const postDocRef = doc(firestoreInstance, "posts", post.id!)
      await deleteDoc(postDocRef)

      // update jotai atom state
      setPosts((prev) => ({
        ...prev,
        posts: prev.posts.filter((element) => element.id !== post.id),
      }))
    } catch (error) {}

    return true
  }

  return {
    posts,
    setPosts,
    onVote,
    onOpenPost,
    onDeletePost,
  }
}
export default usePosts
