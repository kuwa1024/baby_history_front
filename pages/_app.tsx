import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/react'
import '../utils/firebase/init'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>赤ちゃん履歴</title>
      </Head>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  )
}

export default MyApp
