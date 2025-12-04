import { AppSidebar } from "@/shadcncomponents/app-sidebar";
import { ThemeProvider } from "@/shadcncomponents/theme-provider";
import { SidebarInset, SidebarProvider } from "@/shadcncomponents/ui/sidebar";
import type { Metadata } from "next";
import { Header } from "./components/commons/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "BingeWatch",
  description: "All About Anime",

  openGraph: {
    title: "BingeWatch",
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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <SidebarProvider defaultOpen={true}  >
              <AppSidebar />
              <SidebarInset>
                <Header/>
                {children}
                {/* <Footer/> */}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}