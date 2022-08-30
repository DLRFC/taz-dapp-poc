import '../styles/globals.css'
import '../styles/drawingComponent.css'
import type { AppProps } from 'next/app'
import { IdentityProvider } from '../components/IdentityProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdentityProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </IdentityProvider>
  )
}

export default MyApp
