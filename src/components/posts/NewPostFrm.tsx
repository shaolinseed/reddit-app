import { Alert, Flex, Icon } from "@chakra-ui/react"
import React, { ReactComponentElement, useId, useState } from "react"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import PostTypeTab from "./PostTypeTab"
import { Text } from "@chakra-ui/react"
import TextPost from "./postForm/TextPost"
import ImageVideoPost from "./postForm/ImageVideoPost"
import { Post } from "../../store/postState"
import { User } from "firebase/auth"
import { useRouter } from "next/router"
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { firestoreInstance, storage } from "../../firebase/clientApp"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

type Props = {
  user: User
}

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

const NewPostFrm: React.FC<Props> = ({ user }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openTab, setOpenTab] = useState(postTypeTabs[0].title)
  const [uploadedFile, setUploadedFile] = useState<string>()
  const [textInputs, setTextInputs] = useState<PostContent>({
    title: "",
    body: "",
  })

  const router = useRouter()
  // Extract community name from router
  const { communityName } = router.query

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()

    if (event.target.files?.[0]) {
      fileReader.readAsDataURL(event.target.files[0])
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setUploadedFile(readerEvent.target.result as string)
      }
    }
  }

  const processCreatePost = async () => {
    // create new post object
    const createdPost: Post = {
      communityId: communityName as string,
      creatorId: user?.uid,
      creatorUsername: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      commentCount: 0,
      voteStatus: 0,
      timeCreated: serverTimestamp() as Timestamp,
    }

    setLoading(true)

    // surround async code in trycatch
    try {
      // add doc to firebase (add generates random ID whereas setDoc doesn't)
      const postDocRef = await addDoc(
        collection(firestoreInstance, "posts"),
        createdPost
      )

      // if post contains an image
      if (uploadedFile) {
        // store in firebase storage
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, uploadedFile, "data_url")
        const downloadUrl = await getDownloadURL(imageRef)

        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        })
      }
    } catch (error: any) {
      setError(true)
    }
    setLoading(false)

    // router.back()

    // store post in database
    // store image in firebase storage if necessary
  }

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
              processCreatePost={processCreatePost}
              onChange={onTextChange}
            />
          )}

          {openTab === "Images and Video" && (
            <ImageVideoPost
              uploadedFile={uploadedFile}
              onUploadFile={onUploadFile}
              setUploadedFile={setUploadedFile}
              setOpenTab={setOpenTab}
            />
          )}
        </Flex>
      </Flex>
      {error && <Alert></Alert>}
    </Flex>
  )
}
export default NewPostFrm
