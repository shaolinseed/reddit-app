import { Timestamp } from "firebase/firestore"
import { atom } from "jotai"

type Post = {
  id?: string
  communityId: string
  creatorId: string
  creatorUsername: string
  title: string
  body: string
  commentCount: number
  voteStatus: number
  imageUrl?: string
  communityImageUrl?: string
  timeCreated: Timestamp
}

type PostVote = {
  id: string
  postId: string
  communityId: string
  voteValue: number
}

interface PostState {
  selectedPost: Post | null
  posts: Post[]
  postVotes: PostVote[]
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
}

const postsAtom = atom<PostState>(defaultPostState)

export type { Post, PostVote }
export { postsAtom }
