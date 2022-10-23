import { Button, Flex, Image, Stack } from "@chakra-ui/react"
import React, { useRef } from "react"

type Props = {
  uploadedFile?: string
  onUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  setUploadedFile: (value: string) => void
  setOpenTab: (name: string) => void
}

const ImageVideoPost: React.FC<Props> = ({
  uploadedFile,
  onUploadFile,
  setUploadedFile,
  setOpenTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null)

  return (
    <Flex justify="center" align="center" width="100%" direction="column">
      {uploadedFile ? (
        <>
          <Image src={uploadedFile} maxWidth="400px" maxHeight="400px" />
          <Stack direction="row" mt={4}>
            <Button height="36px" onClick={() => setOpenTab("Post")}>
              Return to Post
            </Button>
            <Button
              variant="outline"
              height="36px"
              onClick={() => setUploadedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          width="100%"
          height="200px"
          border="1px dashed"
          borderColor="gray.400"
          borderRadius="4"
        >
          <Button
            justifySelf="center"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onUploadFile}
          />
          <img src={uploadedFile} />
        </Flex>
      )}
    </Flex>
  )
}
export default ImageVideoPost
