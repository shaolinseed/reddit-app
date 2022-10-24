import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { useAtom } from "jotai"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FaReddit } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { RiCakeLine } from "react-icons/ri"
import { auth, firestoreInstance, storage } from "../../firebase/clientApp"
import useUploadFile from "../../hooks/useUploadFile"
import { Community, communityAtom } from "../../store/communityState"

type Props = {
  communityData: Community
}

const About: React.FC<Props> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [, setCommunity] = useAtom(communityAtom)

  const { uploadedFile, setUploadedFile, onUploadFile } = useUploadFile()

  const selectedFileRef = useRef<HTMLInputElement>(null)

  const onUpdateFile = async () => {
    if (!uploadedFile) return
    setUploading(true)
    try {
      const fileRef = ref(storage, `communities/${communityData.id}/image`)
      await uploadString(fileRef, uploadedFile, "data_url")
      const downloadUrl = await getDownloadURL(fileRef)
      await updateDoc(doc(firestoreInstance, "communities", communityData.id), {
        imageUrl: downloadUrl,
      })

      setCommunity((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageUrl: downloadUrl,
        } as Community,
      }))
    } catch (error) {
      console.log("onputdateimage error: ", error)
    }
    setUploading(false)
  }
  return (
    <Box position="sticky" top="16px">
      <Flex
        justify="space-between"
        align="center"
        bg="brand.200"
        color="white"
        p="3"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontWeight="700" fontSize="10pt">
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p="3" bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex width="100%" p="2" fontSize="10pt" fontWeight="700">
            <Flex direction="column" flexGrow="1">
              <Text>{communityData.memberCount.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow="1">
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            fontWeight="500"
            fontSize="10pt"
            align="center"
            width="100%"
            p="1"
          >
            <Icon as={RiCakeLine} fontSize="18" mr="2" mb="2" />
            {communityData.timeCreated && (
              <Text>
                Created on{" "}
                {moment(
                  new Date(communityData.timeCreated.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${router.query.communityName}/submit`}>
            <Button mt="4" height="32px">
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing="1" fontSize="10pt">
                <Text fontWeight="600">Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="brand.200"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageUrl || uploadedFile ? (
                    <Image
                      src={uploadedFile || communityData.imageUrl}
                      borderRadius="full"
                      boxSize="40px"
                      alt="Community Image"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      mr="2"
                      fontSize="40"
                      color="brand.100"
                    />
                  )}
                </Flex>
                {uploadedFile &&
                  (uploading ? (
                    <Spinner />
                  ) : (
                    <Text onClick={onUpdateFile} cursor="pointer">
                      Save Changes
                    </Text>
                  ))}
                <input
                  ref={selectedFileRef}
                  type="file"
                  hidden
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={onUploadFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  )
}
export default About
