import { Button, Flex } from "@chakra-ui/react"
import React, { useRef } from "react"

type Props = {}

const ImageVideoPost: React.FC<Props> = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null)

  return (
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
      <input ref={selectedFileRef} type="file" hidden />
    </Flex>
  )
}
export default ImageVideoPost
