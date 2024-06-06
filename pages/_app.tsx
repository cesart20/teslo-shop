import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from '@mui/material'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr/_internal'
import { AuthProvider, CartProvider, UIProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )

}
