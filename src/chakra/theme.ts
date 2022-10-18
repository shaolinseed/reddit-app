import { extendTheme } from "@chakra-ui/react"
import { Button } from "./button"

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff0075",
      200: "#FF268A",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
        color: "black",
      },
    }),
  },
  components: {
    Button,

    // Input, // not working for some reason - come back to this
  },
})
