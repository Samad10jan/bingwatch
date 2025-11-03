"use client"

import { Moon, SearchIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"


import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useParams, usePathname } from "next/navigation"
import { Anime } from "@/lib/type"
import { useEffect, useState } from "react"
import { title } from "process"
import Link from "next/link"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"


export function Header() {
  const { theme, setTheme } = useTheme()
  const [q, setQ] = useState<string>("")
  const [sugg, setSugg] = useState<Anime[]>([])
  const { type } = useParams()

  console.log(type);

  useEffect(() => {
    if (!q?.trim().length) {
      setSugg([]);
      return;
    }

    const debounceTimeout = setTimeout(async () => {
      try {
        const hasType = ["tv", "movie", "ova", "upcoming"].includes(type as string);
        const url = hasType ?
          `https://api.jikan.moe/v4/anime?q=${q}&type=${type}&limit=10`
          : `https://api.jikan.moe/v4/anime?q=${q}&limit=10`;

        const res = await fetch(url);
        const { data } = await res.json();
        setSugg(data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [q, type]);


  return (
    <header className="sticky flex justify-between gap-2 md:rounded-b-full rounded-b-3xl bg-white/70 dark:bg-black/80 backdrop-blur-md top-0 z-10  md:h-16 shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:p-8 p-5 border">
      <div className="flex items-center px-4 md:hidden lg:hidden xl:hidden ">

        <SidebarTrigger className="rounded-full border p-2 hover:bg-accent transition " />


      </div>



      <h1 className=" flex-1  text-sm md:text-4xl font-extrabold bg-gradient-to-bl from-emerald-500 to-indigo-500 bg-clip-text text-transparent ">
        BingWatch
      </h1>


      <div className="relative max-w-xl w-full">
        {/* Search Bar */}
        <div className="flex h-10 gap-2">
          <Input
            placeholder="search.."
            title="search bar"
            value={q}
            type="text"
            onChange={(e) => setQ(e.target.value)}
            className="flex-1"
          />
          {/* <Button className=""><SearchIcon /></Button> */}
        </div>

        {/* Suggestions Card */}
        {sugg?.length > 0 && (
          <Card className="absolute top-full mt-2 md:w-full md:max-h-[50vh] max-h-[30vh] flex flex-col overflow-y-auto z-50 shadow-lg border w-[130%] ring-accent ring-2">
            {sugg.map((anime, i) => (
              <Link
                href={`/anime/${anime.mal_id}`}
                onClick={() => setQ("")}
                key={i}
                className="hover:bg-accent px-2 md:px-4 py-2 flex items-center gap-3 border-b "
                
              >


                <div className=" relative w-12 h-12 md:w-20 md:h-29 flex-shrink-0 ">
                  <div className=" absolute w-full h-full">

                    <Image
                      src={
                        anime?.images?.jpg?.large_image_url ||
                        anime?.images?.jpg?.image_url ||
                        anime?.picture ||
                        anime?.thumbnail ||
                        "https://via.placeholder.com/80x80?text=No+Image"
                      }
                      fill

                      alt={anime?.title || anime?.title_japanese || anime?.title_english || "Anime"}
                      className="object-cover rounded"
                    />

                  </div>
                </div>

                <div className="text-sm font-medium">
                  {anime?.title_english || anime?.title_japanese}
                </div>
              </Link>
            ))}
          </Card>
        )}

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
            <Card className="*:hover:cursor-pointer size-40 *:hover:ring-1 *:p-3 gap-0 *:mx-1  *:rounded-full *:transition-all h-full *:border-1 gap-y-2 **:text-center  ">

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
    </header >
  )
}
