import { Box } from "@chakra-ui/react"
import React from "react"
import PageContent from "../../../components/layouts/PageContent"
import NewPostFrm from "../../../components/posts/NewPostFrm"

type Props = {}

const submit: React.FC<Props> = () => {
  return (
    <PageContent>
      <>
        <Box py="14px" px="0px" borderBottom="1px solid" borderColor="white">
          Create a Post
        </Box>
        <NewPostFrm />
      </>

      <></>
    </PageContent>
  )
}
export default submit
