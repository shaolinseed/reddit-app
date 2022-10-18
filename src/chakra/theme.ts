import { extendTheme } from "@chakra-ui/react"
import "@fontsource/source-sans-pro/300.css"
import "@fontsource/source-sans-pro/400.css"
import "@fontsource/source-sans-pro/700.css"
import { Button } from "./button"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff0075",
    },
  },
  fonts: {
    body: "Source Sans Pro, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "teal.50",
        color: "black",
      },
    }),
  },
  components: {
    Button,
  },
})

export { theme }
