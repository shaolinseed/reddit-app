import { Box } from "@chakra-ui/react"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import About from "../../../components/community/About"
import PageContent from "../../../components/layouts/PageContent"
import NewPostFrm from "../../../components/posts/NewPostFrm"
import { auth } from "../../../firebase/clientApp"
import useCommunityAtom from "../../../hooks/useCommunityAtom"

type Props = {}

const SubmitPostPage: React.FC<Props> = () => {
  const [user] = useAuthState(auth)
  const { community } = useCommunityAtom()

  return (
    <PageContent>
      <>
        <Box
          py="14px"
          px="0px"
          borderBottom="1px solid"
          borderColor="white"
          fontWeight={700}
        >
          Create a Post
        </Box>
        {user && <NewPostFrm user={user} />}
      </>

      <>
        {community.currentCommunity && (
          <About communityData={community.currentCommunity} />
        )}
      </>
    </PageContent>
  )
}
export default SubmitPostPage
