import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from './context/UserContext'
import { QueryProvider } from './context/QueryContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (<UserProvider>
    <QueryProvider>
    <Component {...pageProps} />
    </QueryProvider>
  </UserProvider>);
}

export default MyApp
