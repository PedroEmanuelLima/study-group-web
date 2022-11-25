import type { AppProps } from 'next/app'
import Head from 'next/head'

import AuthProvider from '../contexts/auth';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content='width=device-width, initial-scale=1.0'/>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
