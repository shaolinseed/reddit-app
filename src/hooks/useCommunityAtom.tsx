import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import {
  Community,
  communityAtom,
  CommunitySnippet,
} from "../store/communityState"
import { auth, firestoreInstance } from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore"
import { authModalAtom } from "../store/authModalState"
import { useRouter } from "next/router"

const useCommunityAtom = () => {
  const [community, setCommunity] = useAtom(communityAtom)
  const [, setAuthModal] = useAtom(authModalAtom)
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  useEffect(() => {
    // if user is logged in get user snippets
    if (user?.uid) {
      getUserSnippets()
    } else {
      // clear userSnippets if no user found
      setCommunity((prev) => ({
        ...prev,
        userSnippets: [],
        snippetsFetched: false,
      }))
    }
  }, [user])

  useEffect(() => {
    const { communityName } = router.query

    // if url contains a community name but no currentCommunity state is found
    // this would happen if user is refreshing page or visiting for first time
    if (communityName && !community.currentCommunity) {
      getCommunityData(communityName as string)
    }
  }, [community.currentCommunity, router.query])

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    // if not => open auth modal
    if (!user) {
      // open modal
      setAuthModal({ open: true, view: "logIn" })
      return
    }

    setLoading(true)
    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }
    joinCommunity(communityData)
  }

  const getUserSnippets = async () => {
    setLoading(true)
    try {
      const snippetDocs = await getDocs(
        collection(firestoreInstance, `users/${user?.uid}/communitySnippets`)
      )
      // convert collection to js objects
      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
      }))

      setCommunity((prev) => ({
        ...prev,
        userSnippets: snippets as CommunitySnippet[],
        snippetsFetched: true,
      }))
    } catch (error) {}
    setLoading(false)
  }

  const joinCommunity = async (communityData: Community) => {
    // Create a new community snippet and add to user data

    try {
      // Using batch as we do not need to read from the db in these operations
      const batch = writeBatch(firestoreInstance)

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageUrl || "",
        isModerator: user?.uid === communityData.creatorId,
      }

      batch.set(
        doc(
          firestoreInstance,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      )

      batch.update(doc(firestoreInstance, "communities", communityData.id), {
        memberCount: increment(1),
      })

      // Execute batch operations
      await batch.commit()

      // Update atom - append new snippet to communities array
      setCommunity((prev) => ({
        ...prev,
        userSnippets: [...prev.userSnippets, newSnippet],
      }))
    } catch (error: any) {
      console.log("joinCommunityError: ", error)
      setError(error.message)
    }
    setLoading(false)
  }

  const leaveCommunity = async (communityId: string) => {
    // Create a new community snippet and add to user data
    // Using batch as we do not need to read from the db in these operations
    const batch = writeBatch(firestoreInstance)

    // Delete the associated community snippet from user data
    batch.delete(
      doc(
        firestoreInstance,
        `users/${user?.uid}/communitySnippets`,
        communityId
      )
    )
    // Decrement the memberCount when a user joins
    batch.update(doc(firestoreInstance, "communities", communityId), {
      memberCount: increment(-1),
    })
    // Execute batch operations

    await batch.commit()

    // Update atom
    setCommunity((prev) => ({
      ...prev,
      userSnippets: prev.userSnippets.filter(
        (element) => element.communityId !== communityId
      ),
    }))

    try {
    } catch (error: any) {
      console.log("leaveCommunityError: ", error)
      setError(error.message)
    }
    setLoading(false)
  }

  const getCommunityData = async (communityName: string) => {
    try {
      const communityDocRef = doc(
        firestoreInstance,
        "communities",
        communityName
      )

      const communityDoc = await getDoc(communityDocRef)

      setCommunity((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }))
    } catch (error: any) {
      console.log(error)
    }
  }
  return {
    community,
    onJoinOrLeaveCommunity,
    loading,
  }
}
export default useCommunityAtom
