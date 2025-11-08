"use client"

import { Bold, Moon, SearchIcon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useParams } from "next/navigation"
import { Anime } from "@/lib/type"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [q, setQ] = useState<string>("")
  const [sugg, setSugg] = useState<Anime[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { type } = useParams()
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Debounced search
  useEffect(() => {
    if (!q?.trim().length) {
      setSugg([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const debounceTimeout = setTimeout(async () => {
      try {
        const hasType = ["tv", "movie", "ova", "upcoming","special"].includes(type as string)
        const hasFilter = type === "upcoming" ? "filter" : "type"
        const url = hasType
          ? `https://api.jikan.moe/v4/anime?q=${q}&${hasFilter}=${type}&limit=10`
          : `https://api.jikan.moe/v4/anime?q=${q}&limit=10`

        const res = await fetch(url)
        const { data } = await res.json()
        setSugg(data || [])
      } catch (err) {
        console.error("Error fetching suggestions:", err)
        setSugg([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [q, type])

  return (
    <header className="sticky  flex justify-between gap-2 top-0 z-10 md:h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:p-8 p-5 ">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center md:hidden lg:hidden xl:hidden ">
        <SidebarTrigger className="rounded-full border p-5 hover:bg-accent transition size-10 bg-accent h-[1.2rem] w-[1.2rem] " />
      </div>


      {/* Floating Search */}
      <div className="relative max-w-full md:max-w-3xl w-full " ref={searchRef}>
        <div className="relative flex items-center gap-2  ">


          {/* Search Input */}
          <Input
            placeholder="Search anime..."
            value={q}
            type="text"
            onChange={(e) => {
              setQ(e.target.value)
              setIsSearchOpen(true)
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full h-10 px-10 rounded-full py-2 text-sm  transition-all !bg-accent"
          />

          {/* Clear Button */}
          {q && (
            <Button

              onClick={() => {
                setQ("")
                setSugg([])
              }}
              className="absolute rounded-4xl right-3 !bg-accent text-accent-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Floating Suggestions Dropdown */}
        {isSearchOpen && q && (
          <Card className="absolute top-full mt-2 w-full max-h-[60vh] overflow-y-auto z-50 shadow-xl border-2 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">

            {
              isLoading ? (
                <div className="p-8 flex justify-center items-center gap-1">
                  <Spinner/>
                  <p className=" text-sm text-muted-foreground">Searching...</p>
                </div>
              ) :
                sugg.length === 0 ?
                  (
                    <div className="p-8 text-center">
                      <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-2 text-sm font-medium">No anime found</p>
                      <p className="text-xs text-muted-foreground">Try a different search term</p>
                    </div>
                  ) :
                  (
                    <div >
                      {sugg.map((anime, i) => (
                        <Link
                          href={`/anime/${anime.mal_id}`}
                          onClick={() => {
                            setQ("")
                            setIsSearchOpen(false)
                          }}
                          key={i}
                          title={anime.title}
                          className="flex items-center gap-4 p-3 hover:bg-accent/50 transition-colors "
                        >
                          {/* Anime Image */}
                          <div className="relative w-15 h-18 md:w-16 md:h-20 flex-shrink-0 overflow-hidden rounded-md ring-2 ring-border  transition-all">
                            <Image
                              src={
                                anime?.images?.jpg?.small_image_url ||
                                anime?.images?.jpg?.image_url ||
                                "/no-img.png"
                              }
                              fill
                              alt={anime?.title || "Anime"}
                              className="object-cover"
                              sizes="(max-width: 768px) 48px, 64px"
                            />
                          </div>

                          {/* Anime Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate  transition-colors">
                              {anime?.title_english || anime?.title_japanese || anime?.title}
                            </p>
                            {anime?.type && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {anime.type} {anime?.episodes && `• ${anime.episodes} episodes`}
                              </p>
                            )}
                          </div>

                          
                        </Link>
                      ))}
                    </div>
                  )}
          </Card>
        )}
      </div>

      {/* Theme Toggle */}
      <div className="flex flex-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-full !bg-accent">
            <Button variant="outline" size="icon" className="hover:bg-amber-100 transition-colors p-6">
              <Sun className="h-[1.2rem] w-[1.2rem] hover:bg-amber-100 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Card className="*:hover:cursor-pointer size-40 *:hover:ring-1 *:p-3 gap-0 *:mx-1 *:rounded-full *:transition-all h-full *:border-1 gap-y-2 **:text-center">
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