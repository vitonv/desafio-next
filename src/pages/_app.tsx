import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { theme } from '../../styles/theme'
import { SidebarDrawerProvider } from "../hooks/contexts/SidebarDrawer"
import { QueryClient, QueryClientProvider } from "react-query"
import { AuthProvider } from "../hooks/contexts/AuthContext"


const queryClient = new QueryClient()
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp