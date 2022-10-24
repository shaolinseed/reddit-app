import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { FaReddit } from "react-icons/fa"
import { Community, communityAtom } from "../../store/communityState"
import useCommunityAtom from "../../hooks/useCommunityAtom"

type Props = {
  communityData: Community
}

const Header: React.FC<Props> = ({ communityData }) => {
  const { community, onJoinOrLeaveCommunity, loading } = useCommunityAtom()
  console.log("------------------")

  console.log(community)

  console.log("------------------")

  // check if user is member of current community
  const isMember = Boolean(
    community.userSnippets.find(
      (element) => element.communityId === communityData.id
    )
  )

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="40%" bg="brand.300" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="960px">
          {community.currentCommunity?.imageUrl ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={community.currentCommunity.imageUrl}
              alt="Community Image"
              position="relative"
              top="-3"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top="-3"
              color="brand.100"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex py="10pt" px="16px">
            <Flex direction="column" mr="6">
              <Text fontWeight="800" fontSize="18pt">
                {communityData.id}
              </Text>
              <Text fontWeight="600" fontSize="10pt" color="#4fe605">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isMember ? "outline" : "solid"}
              height="30px"
              px={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isMember)}
              isLoading={loading}
            >
              {isMember ? " Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
