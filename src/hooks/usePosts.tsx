import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestoreInstance, storage } from "../firebase/clientApp"
import { authModalAtom } from "../store/authModalState"
import { communityAtom, currentCommunityAtom } from "../store/communityState"
import { Post, postsAtom, PostVote } from "../store/postState"

/**
 * usePosts hook to enable common post interaction functionality
 * across multiple pages
 */
const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [, setAuthModal] = useAtom(authModalAtom)
  const [currentCommunity] = useAtom(currentCommunityAtom)
  const [user] = useAuthState(auth)

  const router = useRouter()

  useEffect(() => {
    if (!currentCommunity?.id || !user) return
    getCommunityPostVotes(currentCommunity.id)
  }, [currentCommunity, user])

  useEffect(() => {
    // if no user logged in clear the post votes state
    if (!user) {
      setPosts((prev) => ({
        ...prev,
        postVotes: [],
      }))
    }
  }, [user])

  const onVote = async (
    post: Post,
    vote: number,
    communityId: string,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    // prevent double click action on post vote click
    event.stopPropagation()

    // if user is not logged in prompt sign in
    if (!user?.uid) {
      setAuthModal({
        open: true,
        view: "logIn",
      })
    }

    const { voteStatus } = post

    // find post of current post (return undefined if not found)
    const existingVote = posts.postVotes.find(
      (element) => element.postId === post.id
    )

    try {
      let voteChange = vote

      const batch = writeBatch(firestoreInstance)

      /**
       * Store copy of post data for modification to avoid mutating state directly
       * Doing so would cause unwanted side effects
       */
      const updatedPost = { ...post }
      let updatedPostVotes = [...posts.postVotes]

      const updatedPosts = [...posts.posts]

      // if new vote
      if (!existingVote) {
        // write document to users/postVotes collection
        const postVoteRef = doc(
          collection(firestoreInstance, "users", `${user?.uid}/postVotes`)
        )

        // create vote object to be inserted to DB
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id as string,
          communityId,
          voteValue: vote,
        }

        batch.set(postVoteRef, newVote)

        updatedPost.voteStatus = voteStatus + vote
        // append new vote to post votes array
        updatedPostVotes = [...updatedPostVotes, newVote]

        // await batch.commit()
      }
      // if existing vote
      else {
        const postVoteRef = doc(
          firestoreInstance,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        )

        //if user is removing their existing vote
        if (vote === existingVote.voteValue) {
          updatedPost.voteStatus = voteStatus - vote
          // remove the vote from post votes array
          updatedPostVotes = updatedPostVotes.filter(
            (element) => element.id !== existingVote.id
          )

          // delete the postVote document from DB
          batch.delete(postVoteRef)

          // negate voteChange depending on up or down vote
          voteChange *= -1
        }
        // if user is flipping voting for the alternate option
        else {
          /**
           * increase / decrease voteChange by 2
           * if downvoting, vote will be negative 1
           * if upvoting, vote will be positive 1
           */
          updatedPost.voteStatus = voteStatus + 2 * vote

          // find index of vote to update
          const voteIndex = posts.postVotes.findIndex(
            (element) => element.id === existingVote.id
          )

          // update the vote in the post votes array
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          }

          batch.update(postVoteRef, {
            voteValue: vote,
          })

          voteChange = vote * 2
        }
      }

      // send change to firebase
      const postRef = doc(firestoreInstance, "posts", post.id!)
      batch.update(postRef, { voteStatus: voteStatus + voteChange })

      //write updates to DB
      await batch.commit()

      // find the post index
      const postIndex = posts.posts.findIndex(
        (element) => element.id === post.id
      )

      // update the post at the found index
      updatedPosts[postIndex] = updatedPost

      // update jotai state with posts and postVotes arrays
      setPosts((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }))

      if (posts.openPost) {
        setPosts((prev) => ({
          ...prev,
          openPost: updatedPost,
        }))
      }
    } catch (error) {
      console.log("Errors: ", error)
    }
  }

  /**
   * Retreives the votes the currently signed in user has in the
   * community they are currently browsing
   * @param communityId - the ID / Name of the community to search
   */
  const getCommunityPostVotes = async (communityId: string) => {
    // Create firestore query
    const postVotesQuery = query(
      // select postvotes collection from users collection
      collection(firestoreInstance, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    )
    // get array of firebase docs from DB
    const postVoteDocs = await getDocs(postVotesQuery)

    // store postVotes docs as JS object
    const postVotes = postVoteDocs.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }))

    // update jotai state to include the posts voted on by the user
    setPosts((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }))
  }

  const onOpenPost = async (post: Post) => {
    setPosts((prev) => ({
      ...prev,
      openPost: post,
    }))

    // redirect user to opened post
    router.push(`/r/${post.communityId}/comments/${post.id}`)
  }
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
