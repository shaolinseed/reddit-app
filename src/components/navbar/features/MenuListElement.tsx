import { Flex, Icon, MenuItem, Image } from "@chakra-ui/react"
import { getRSCModuleType } from "next/dist/build/analysis/get-page-static-info"
import React from "react"
import { IconType } from "react-icons"
import useFeatures from "../../../hooks/useFeatures"

type Props = {
  communityName: string
  link: string
  icon: IconType
  iconColor: string
  imageUrl?: string
}

const MenuListElement: React.FC<Props> = ({
  communityName,
  link,
  icon,
  iconColor,
  imageUrl,
}) => {
  const { communityMenu, toggleMenuOpen, onMenuElementClick } = useFeatures()

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      fontWeight="400"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onMenuElementClick({
          communityName,
          link,
          icon,
          iconColor,
          imageUrl,
        })
      }
    >
      <Flex align="center">
        {imageUrl ? (
          <Image src={imageUrl} borderRadius="full" boxSize="20px" mr={2} />
        ) : (
          <Icon as={icon} mr="2" fontSize="22" color={iconColor} ml="-1px" />
        )}
        {communityName}
      </Flex>
    </MenuItem>
  )
}
export default MenuListElement
