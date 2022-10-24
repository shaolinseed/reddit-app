import { Stack, SkeletonText, Skeleton, Box } from "@chakra-ui/react"
import React from "react"

type Props = {}

const PostLoader: React.FC<Props> = () => {
  return (
    <Stack spacing={6}>
      <Box p="10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <Skeleton mt="4" height="200px" />
      </Box>
      <Box p="10px" boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText noOfLines={1} width="40%" mt="4" spacing="4" />
        <SkeletonText noOfLines={4} spacing="4" mt="4" />
        <Skeleton mt="4" height="200px" />
      </Box>
    </Stack>
  )
}
export default PostLoader
