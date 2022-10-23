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

interface PostState {
  selectedPost: Post | null
  posts: Post[]
  // postRating
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
}

const postsAtom = atom<PostState>(defaultPostState)

export type { Post }
export { postsAtom }
