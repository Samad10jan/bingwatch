"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"


export function Header() {
  // const { theme,setTheme } = useTheme()
  
  
  // function handleTheme(){
  //   if(theme==='dark'){
  //       setTheme('light')
  //       return
  //   }
  //   setTheme("dark")


  // }

  return (
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          
        
          <div className="flex-1 flex justify-center md:justify-start">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-50 to-yellow-300 bg-clip-text text-transparent">
              BingWatch
            </h1>
          </div>
        </header>
  )
}
