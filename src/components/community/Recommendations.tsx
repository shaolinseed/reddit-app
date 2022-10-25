import {
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react"
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FaReddit } from "react-icons/fa"
import { firestoreInstance } from "../../firebase/clientApp"
import useCommunityAtom from "../../hooks/useCommunityAtom"
import { Community } from "../../store/communityState"

const Recommendations: React.FC = () => {
  const [communities, setCommunties] = useState<Community[]>([])
  const [loading, setLoading] = useState(false)

  const { community, onJoinOrLeaveCommunity } = useCommunityAtom()

  useEffect(() => {
    getCommunityRecommendations()
  }, [])

  const getCommunityRecommendations = async () => {
    setLoading(true)
    try {
      const communityQuery = query(
        collection(firestoreInstance, "communities"),
        limit(5),
        orderBy("memberCount", "desc")
      )

      const communityDocs = await getDocs(communityQuery)

      const retreivedCommunities = communityDocs.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }))

      setCommunties(retreivedCommunities as Community[])
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <Flex direction="column" bg="white" borderRadius="4" borderColor="gray.400">
      <Flex
        align="flex-end"
        textColor="white"
        py="6px"
        px="10px"
        height="70px"
        borderRadius="4px 4px 2px 2px"
        // custom gradient to make text pop
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('/images/recCommsArt.png')"
        bgSize="cover"
        fontWeight="700"
      >
        Top Communities
      </Flex>

      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((element, index) => {
              const isMember = !!community.userSnippets.find(
                (snippet) => snippet.communityId === element.id
              )

              return (
                <Box key={element.id}>
                  <Link href={`/r/${element.id}`}>
                    <Flex
                      py="10px"
                      px="12px"
                      fontWeight="600"
                      align="center"
                      fontSize="10pt"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      cursor="pointer"
                    >
                      <Flex width="80%" align="center">
                        <Flex width="15%">
                          <Text mr={2}>{index + 1}</Text>
                        </Flex>
                        <Flex align="center" width="80%">
                          {element.imageUrl ? (
                            <Image
                              alt="Community Image"
                              borderRadius="full"
                              boxSize="28px"
                              src={element.imageUrl}
                              mr={2}
                            />
                          ) : (
                            <Icon
                              mr="2"
                              fontSize={30}
                              color="brand.100"
                              as={FaReddit}
                            />
                          )}
                          <span
                            // account for long names
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >{`r/${element.id}`}</span>
                        </Flex>
                      </Flex>
                      <Box position="absolute" right="10px">
                        <Button
                          fontSize="8pt"
                          height="20px"
                          //   prevent double click action
                          onClick={(event) => {
                            event.stopPropagation()
                            onJoinOrLeaveCommunity(element, isMember)
                          }}
                          variant={isMember ? "outline" : "solid"}
                        >
                          {isMember ? "Joined" : "Join"}
                        </Button>
                      </Box>
                    </Flex>
                  </Link>
                </Box>
              )
            })}
          </>
        )}
        <Box py="10px" px="20px">
          <Button width="100%" height="30px">
            View All
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
export default Recommendations
