import '../styles/globals.css'
import '../styles/drawingComponent.css'
import type { AppProps } from 'next/app'
import { IdentityContextProvider } from '../context/IdentityContextProvider'
import Header from '../components/Header'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <IdentityContextProvider>
      <Header />
      <Component {...pageProps} />
    </IdentityContextProvider>
  )

export default MyApp
