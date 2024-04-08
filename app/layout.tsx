import StoreProvider from './StoreProvider'
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
// import NextNProgress from 'nextjs-progressbar'
import 'react-toastify/dist/ReactToastify.css'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="ru">
        <body>
          {children}
          <ToastContainer
            position="bottom-right"
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            limit={1}
            theme="light"
          />
        </body>
      </html>
    </StoreProvider>
  )
}
