import { Timestamp } from "@google-cloud/firestore"
import { atom } from "jotai"
import { atomWithReset } from "jotai/utils"

interface Community {
  id: string
  creatorId: string
  memberCount: number
  privacyType: "public" | "restricted" | "private"
  timeCreated?: Timestamp
  imageUrl: string
}

interface CommunitySnippet {
  communityId: string
  isModerator?: boolean
  imageUrl?: string
}

interface CommunityState {
  userSnippets: CommunitySnippet[]
  currentCommunity?: Community
}

const communityAtom = atomWithReset<CommunityState>({
  userSnippets: [],
})

export type { Community, CommunitySnippet }

export { communityAtom }
