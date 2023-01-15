import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]:'https://goerli.infura.io/v3/350213ab5927474cbd4134c78149da7a'
    }}
  >
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    
  </ThirdwebProvider>
  )
}

export default MyApp
