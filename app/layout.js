import "../styles/globals.css";
import AuthProvider from "./(components)/AuthProvider";
import NavUser from "./(components)/NavUser";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "@next/third-parties/google";
import Providers from "./Providers";
import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import { Roboto } from 'next/font/google'
import Modal from "./(components)/modal";
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
  title: {
    default: "STRATEGY IAS",
    template: `%s | STRATEGY IAS`,
  },
  description: "Welcome to Next.js",
  verification: {
    google: `${process.env.google_site_verification}`,
  },
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className={roboto.className}>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GTM_ID}`} />

      <Script
        id="my-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      ></Script>
      <Script id="my-script1" strategy="lazyOnload">
        {` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
      </Script>
      <body>
        <Modal/>
        <div className="">
              <marquee className="marAdv"><a href="https://t.me/strategy_ias" target="_blank">Get GS Wise Toppers answer copy compilation of UPSC 2023 Toppers at Rs. 199/GS Paper. Join at @strategy_ias</a></marquee>
            </div>
        <div className={session?.user.role === "admin" ? "mainContainer" : ""}>
          <Toaster position="top-center" />
          <AuthProvider>
            <NavUser />
            <Providers>
              <div className="childrenMainContainer">{children}</div>
            </Providers>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
