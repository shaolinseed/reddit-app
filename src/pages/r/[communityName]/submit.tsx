import { Box } from "@chakra-ui/react"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import PageContent from "../../../components/layouts/PageContent"
import NewPostFrm from "../../../components/posts/NewPostFrm"
import { auth } from "../../../firebase/clientApp"

type Props = {}

const SubmitPostPage: React.FC<Props> = () => {
  const [user] = useAuthState(auth)

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

      <></>
    </PageContent>
  )
}
export default SubmitPostPage
