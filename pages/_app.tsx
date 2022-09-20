import type { AppProps } from 'next/app'
import { ThemeProvider } from "@material-tailwind/react"

import { IdentityContextProvider } from '../context/IdentityContextProvider'
import '../styles/globals.css'
import '../styles/drawingComponent.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <IdentityContextProvider>
      <Component {...pageProps} />
    </IdentityContextProvider>
  </ThemeProvider>
  
)

export default MyApp
