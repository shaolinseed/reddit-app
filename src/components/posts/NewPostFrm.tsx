import { Flex, Icon } from "@chakra-ui/react"
import React, { useState } from "react"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import PostTypeTab from "./PostTypeTab"
import { Text } from "@chakra-ui/react"
import TextPost from "./postForm/TextPost"
import ImageVideoPost from "./postForm/ImageVideoPost"

type Props = {}

const postTypeTabs: PostTypeTab[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images and Video",
    icon: IoImageOutline,
  },
]

export type PostTypeTab = {
  title: string
  icon: typeof Icon.arguments
}

export type PostContent = {
  title: string
  body: string
}

const NewPostFrm: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const [openTab, setOpenTab] = useState(postTypeTabs[0].title)
  const [selectedFile, setSelectedFile] = useState<string>()
  const [textInputs, setTextInputs] = useState<PostContent>({
    title: "",
    body: "",
  })

  const onSelectImage = () => {}

  const onCreatePost = async () => {}

  const onTextChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Flex direction="column" bg="white" borderRadius="4" mt="2">
      <Flex width="100%">
        {postTypeTabs.map((element) => (
          <PostTypeTab
            tab={element}
            open={element.title === openTab}
            setOpenTab={setOpenTab}
            key={element.title}
          />
        ))}
      </Flex>
      <Flex>
        <Flex p="4" width="100%">
          {openTab === "Post" && (
            <TextPost
              loading={loading}
              textInputs={textInputs}
              onCreatePost={onCreatePost}
              onChange={onTextChange}
            />
          )}

          {openTab === "Images and Video" && <ImageVideoPost />}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default NewPostFrm
