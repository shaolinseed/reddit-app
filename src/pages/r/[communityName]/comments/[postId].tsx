import { User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import About from "../../../../components/community/About"
import PageContent from "../../../../components/layouts/PageContent"
import Comments from "../../../../components/posts/comments/Comments"
import PostElement from "../../../../components/posts/PostElement"
import { auth, firestoreInstance } from "../../../../firebase/clientApp"
import useCommunityAtom from "../../../../hooks/useCommunityAtom"
import usePosts from "../../../../hooks/usePosts"
import { Post } from "../../../../store/postState"

const PostPage: NextPage = () => {
  // destructure usePosts hook
  const { posts, setPosts, onDeletePost, onVote } = usePosts()
  const { community } = useCommunityAtom()
  const [user] = useAuthState(auth)
  const router = useRouter()

  const getPost = async (postId: string) => {
    try {
      // find requested post in DB
      const postDocRef = doc(firestoreInstance, "posts", postId)

      const postDoc = await getDoc(postDocRef)

      setPosts((prev) => ({
        ...prev,
        openPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }))
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { postId } = router.query

    // if url contains a post but no actualPostPage state is found
    // this would happen if user is refreshing page or visiting for first time
    if (postId && !posts.openPost) {
      getPost(postId as string)
    }
  }, [router.query, posts.openPost])

  return (
    <PageContent>
      {/* LHS */}
      <>
        {posts.openPost && (
          <PostElement
            post={posts.openPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              posts.postVotes.find(
                (element) => element.postId === posts.openPost!.id
              )?.voteValue
            }
            isUserAuthor={user?.uid === posts.openPost?.creatorId}
          />
        )}
        <Comments
          user={user as User}
          openPost={posts.openPost}
          communityId={posts.openPost?.communityId as string}
        />
      </>
      {/* RHS */}

      <>
        {community.currentCommunity && (
          <About communityData={community.currentCommunity} />
        )}
      </>
    </PageContent>
  )
}
export default PostPage
