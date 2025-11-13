import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BingWatch",
  description: "All About Anime",
  
  openGraph: {
    title: "BingWatch",
    description: "All About Anime",
    images: [
      {
        url: "https://avatarfiles.alphacoders.com/374/374827.jpeg",
        width: 1200,
        height: 630,
        alt: "Anime-themed BingWatch banner",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }: {children:React.ReactNode}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            
            
          >
            
          
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}