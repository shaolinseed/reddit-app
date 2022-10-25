import { doc, getDoc } from "firebase/firestore"
import { GetServerSidePropsContext, NextPage } from "next"
import React, { useEffect } from "react"
import safeJsonStringify from "safe-json-stringify"
import NotFound from "../../../components/community/NotFound"
import { Community, communityAtom } from "../../../store/communityState"
import { firestoreInstance } from "../../../firebase/clientApp"
import Header from "../../../components/community/Header"
import PageContent from "../../../components/layouts/PageContent"
import CreatePostLink from "../../../components/navbar/features/CreatePostLink"
import Posts from "../../../components/posts/Posts"
import { useAtom } from "jotai"
import About from "../../../components/community/About"
type Props = {
  communityData: Community
}
const CommunityPage: NextPage<Props> = ({ communityData }) => {
  const [, setCommunity] = useAtom(communityAtom)

  // update community state when communityData changes
  useEffect(() => {
    setCommunity((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }))
  }, [communityData])

  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
      <Header communityData={communityData} />
      {/* pass 2 children to PageLayout */}
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestoreInstance,
      "communities",
      context.query.communityName as string
    )
    const communityDoc = await getDoc(communityDocRef)

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    }
  } catch (error) {
    console.log("getServerSideProps error", error)
  }
}

export default CommunityPage
