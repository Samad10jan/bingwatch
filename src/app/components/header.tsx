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
   <div className="w-full flex justify-between h-50">
    <div>

    <Button onClick={handleTheme}>{theme==="dark"?<MoonIcon/>:<SunIcon/>}</Button>
    </div>
   </div>
  )
}
