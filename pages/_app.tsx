import '../styles/globals.css'
import '../styles/drawingComponent.css'
import type { AppProps } from 'next/app'
import { IdentityContextProvider } from '../context/IdentityContextProvider'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <IdentityContextProvider>
      <Component {...pageProps} />
    </IdentityContextProvider>
  )

export default MyApp
