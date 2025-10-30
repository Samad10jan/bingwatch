"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function Header() {
  const { theme,setTheme } = useTheme()
  
  
  function handleTheme(){
    if(theme==='dark'){
        setTheme('light')
        return
    }
    setTheme("dark")


  }

  return (
   <header className={`sticky h-[6vh] md:h-[10vh] top-0 left-0 right-0 z-50 bg-gray-500/30 shadow-md backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto  flex justify-between items-center">
        <h1 className="text-xl font-semibold">My App</h1>
           <Button onClick={handleTheme}>T</Button>

      </div>
    </header>
  )
}
