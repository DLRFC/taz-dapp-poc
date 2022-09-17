import type { AppProps } from 'next/app'

import { IdentityContextProvider } from '../context/IdentityContextProvider'
import Footer from '../components/Footer'
import '../styles/globals.css'
import '../styles/drawingComponent.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IdentityContextProvider>
    <Component {...pageProps} />
    <Footer />
  </IdentityContextProvider>
)

export default MyApp
