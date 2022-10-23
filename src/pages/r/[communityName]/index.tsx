import { doc, getDoc } from "firebase/firestore"
import { GetServerSidePropsContext, NextPage } from "next"
import React from "react"
import safeJsonStringify from "safe-json-stringify"
import NotFound from "../../../components/community/NotFound"
import { Community } from "../../../store/communityState"
import { firestoreInstance } from "../../../firebase/clientApp"
import Header from "../../../components/community/Header"
import PageContent from "../../../components/layouts/PageContent"
import CreatePostLink from "../../../components/navbar/features/CreatePostLink"
type Props = {
  communityData: Community
}
const CommunityPage: NextPage<Props> = ({ communityData }) => {
  console.log(communityData)

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
        </>
        <>
          <div>rhs</div>
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
