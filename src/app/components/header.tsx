"use client"

import { Moon, SearchIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"


export function Header() {
  const { theme, setTheme } = useTheme()
  
  // const [sugg,setSugg]= React.useState([])
  // React.useEffect(()=>{
  //   async function getSugg() {
      
      
  //   }
  // })


  return (
    <header className="sticky flex justify-between gap-2 md:rounded-b-full rounded-b-3xl bg-white/70 dark:bg-black/80 backdrop-blur-md top-0 z-10  md:h-16 shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:p-8 p-5 border">
      <div className="flex items-center px-4 md:hidden lg:hidden xl:hidden ">

        <SidebarTrigger className="rounded-full border p-2 hover:bg-accent transition " />


      </div>



      <h1 className="text-2xl flex-1  sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-bl from-emerald-500 to-indigo-500 bg-clip-text text-transparent ">
        BingWatch
      </h1>


      <div className=" h-10 flex-2 max-w-xl w-full flex ">
        <Input placeholder="search.." title="search bar" name="q" type="text" />
        <Button><SearchIcon/></Button>

      </div>

      <div className="flex flex-1 justify-end" >
        <DropdownMenu  >
          <DropdownMenuTrigger asChild className="rounded-full  ">
            <Button variant="outline" size="icon" className="hover:bg-amber-100 transition-colors p-6">
              <Sun className="h-[1.2rem] w-[1.2rem] hover:bg-amber-100 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem]  w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <Card className="*:hover:cursor-pointer size-40 *:p-3 gap-0 *:mx-1  *:rounded-full *:transition-all h-full *:border-1 gap-y-2 **:text-center  ">

              <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-amber-100 hover:text-black">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-black hover:text-white">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-gradient-to-r from-black to-white">
                System
              </DropdownMenuItem>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
