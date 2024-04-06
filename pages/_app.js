import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <main className={`${inter}`}>
    <SessionProvider session={session}>
      <Header/>
      <Component {...pageProps}/>
      <Toaster
          position="bottom-center"
          reverseOrder={false}
      />
    </SessionProvider>
  </main>
}
