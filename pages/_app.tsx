import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/Components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import '@/styles/index.scss'
export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <ToastContainer/>
    <Component {...pageProps} />
  </Layout>
}
