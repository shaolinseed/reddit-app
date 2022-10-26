import { Button, IconButton, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { useAtom } from "jotai"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BsGithub } from "react-icons/bs"
import PersonalHome from "../components/community/Personal"
import Recommendations from "../components/community/Recommendations"
import PageContent from "../components/layouts/PageContent"
import CreatePostLink from "../components/navbar/features/CreatePostLink"
import PostElement from "../components/posts/PostElement"
import PostLoader from "../components/posts/PostLoader"
import { auth, firestoreInstance } from "../firebase/clientApp"
import useCommunityAtom from "../hooks/useCommunityAtom"
import usePosts from "../hooks/usePosts"
import { communityAtom } from "../store/communityState"
import { Post, PostVote } from "../store/postState"

import { Link } from "@chakra-ui/react"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [user, loadingUser] = useAuthState(auth)

  const { posts, setPosts, onVote, onOpenPost, onDeletePost } = usePosts()

  const { community } = useCommunityAtom()

  // check if user is logged in
  useEffect(() => {
    if (!user && !loadingUser) {
      buildHomeFeed()
    }
  }, [user, loadingUser])

  useEffect(() => {
    if (community.snippetsFetched) {
      buildUserHomeFeed()
    }
  }, [community.snippetsFetched])

  useEffect(() => {
    if (user && posts.posts.length) {
      getUserPostVotes()
    }

    // clean up function
    return () => {
      setPosts((prev) => ({
        ...prev,
        postVotes: [],
      }))
    }
  }, [user, posts.posts])

  const buildHomeFeed = async () => {
    setLoading(true)
    try {
      // get 10 most upvoted posts
      const postQuery = query(
        collection(firestoreInstance, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      )
      // execute query
      const postDocs = await getDocs(postQuery)

      // store retreivedPosts
      const retreivedPosts = postDocs.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }))

      // update state
      setPosts((prev) => ({
        ...prev,
        posts: retreivedPosts as Post[],
      }))
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message)
    }
    setLoading(false)
  }

  const buildUserHomeFeed = async () => {
    setLoading(true)
    try {
      // if user is a part of communities and posts exist in those communities
      if (community.userSnippets.length && posts.posts.length) {
        // store communityIds of relevant communtiies associated with logged in user
        const userCommunityIds = community.userSnippets.map(
          (element) => element.communityId
        )

        // find relevant posts
        const postQuery = query(
          collection(firestoreInstance, "posts"),
          limit(10),
          where("communityId", "in", userCommunityIds)
        )

        // execute query
        const postDocs = await getDocs(postQuery)

        // store retreivedPosts
        const retreivedPosts = postDocs.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }))

        // update state with retreivedPosts

        setPosts((prev) => ({
          ...prev,
          posts: retreivedPosts as Post[],
        }))
      }

      // if user isn't part of any communties or there aren't any posts in their communities
      else {
        // build generic feed
        buildHomeFeed()
      }
    } catch (error) {}
    setLoading(false)
  }

  const getUserPostVotes = async () => {
    try {
      const postIds = posts.posts.map((element) => element.id)

      const postVotesQuery = query(
        collection(firestoreInstance, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      )

      const postVoteDocs = await getDocs(postVotesQuery)

      const retreivedPostVotes = postVoteDocs.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }))

      // update state with post votes
      setPosts((prev) => ({
        ...prev,
        postVotes: retreivedPostVotes as PostVote[],
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PageContent>
      {/* LHS */}
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {posts.posts.map((element) => (
              <PostElement
                post={element}
                userVoteValue={
                  posts.postVotes.find((item) => item.postId === element.id)
                    ?.voteValue
                }
                isUserAuthor={user?.uid === element.creatorId}
                key={element.id}
                onVote={onVote}
                onOpenPost={onOpenPost}
                onDeletePost={onDeletePost}
                homePage={true}
              />
            ))}
          </Stack>
        )}
      </>
      {/* RHS */}

      <Stack spacing="8">
        <Recommendations />
        <PersonalHome />

        <Link href="https://github.com/shaolinseed/reddit-app" isExternal>
          <Button
            leftIcon={<BsGithub fontSize="14pt" />}
            bg="#333"
            variant="solid"
            width="100%"
            _hover={{ color: "brand.200" }}
          >
            Github Repo
          </Button>
        </Link>
      </Stack>
    </PageContent>
  )
}

export default Home
