import { Timestamp } from "@google-cloud/firestore"
import { atom } from "jotai"
import { atomWithReset } from "jotai/utils"
import { focusAtom } from "jotai/optics"

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
  snippetsFetched: boolean
}

const communityAtom = atomWithReset<CommunityState>({
  userSnippets: [],
  snippetsFetched: false,
})

const currentCommunityAtom = atom((get) => get(communityAtom).currentCommunity)
const userSnippetsAtom = atom((get) => get(communityAtom).userSnippets)

export type { Community, CommunitySnippet }

export { communityAtom, currentCommunityAtom, userSnippetsAtom }
