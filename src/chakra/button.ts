import { ComponentStyleConfig } from "@chakra-ui/react"

const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "brand.100",
      _hover: {
        bg: "pink.300",
      },
    },
    outline: {
      color: "brand.100",
      border: "1px solid",
      borderColor: "pink.500",
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
    },
  },
}

export { Button }
