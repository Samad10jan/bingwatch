"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { Anime, Manga } from "@/lib/type"
import { HomeIcon, Moon, SearchIcon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [q, setQ] = useState<string>("")
  const [sugg, setSugg] = useState<Anime[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { type } = useParams()
  const searchRef = useRef<HTMLDivElement>(null)
  const path = usePathname()



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
        const hasAnimeType = ["tv", "movie", "ova", "upcoming", "special"].includes(type as string)
        const hasFilter = type === "upcoming" ? "filter" : "type"

        const hasMangaType = ["manhwa", "lightnovel", "oneshot", "manhua", "novel", "manga"].includes(type as string)


        const urlObj = {
          mangaUrl: hasMangaType
            ? `https://api.jikan.moe/v4/manga?q=${q}&type=${type}&limit=8&sfw=1`
            : `https://api.jikan.moe/v4/manga?q=${q}&limit=8&sfw=1`,

          animeUrl: hasAnimeType
            ? `https://api.jikan.moe/v4/anime?q=${q}&${hasFilter}=${type}&limit=8&sfw=1`
            : `https://api.jikan.moe/v4/anime?q=${q}&limit=8&sfw=1`
        }
      
        const url = path.startsWith("/mangas") ? urlObj.mangaUrl : urlObj.animeUrl

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
    <header className="sticky  flex justify-between gap-2 top-0 z-50 md:h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:p-8 p-5  ">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center md:hidden lg:hidden xl:hidden gap-3 ">
        <SidebarTrigger className="rounded-full border p-6  transition size-10 bg-accent h-[1.2rem] w-[1.2rem] " />
        {path !== "/" &&
          <Button variant={"secondary"} className="bg-accent border rounded-full py-5   " onClick={() => { window.location.href = "/" }}>
            <HomeIcon className="m-0 " />
          </Button>}
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
            className="w-full h-10 px-10 rounded-full py-2 text-sm  transition-all !bg-accent "
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
          <Card className="absolute top-full mt-2 w-full max-h-[60vh] overflow-y-auto z-50 shadow-xl border-2 rounded-2xl ">

            {
              isLoading ? (
                <div className="p-8 flex justify-center items-center gap-1">
                  <Spinner />
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
                          href={path.startsWith("/mangas") ? `/manga/${anime.mal_id}` : `/anime/${anime.mal_id}`}
                          onClick={() => {
                            setQ("")
                            setIsSearchOpen(false)
                          }}
                          key={i}
                          title={anime.title}
                          className="flex items-center gap-4 p-3 hover:bg-accent/50 transition-colors "
                        >
                          {/* Anime Image */}
                          <div className="relative w-25 h-38 md:w-20 md:h-35 flex-shrink-0 overflow-hidden rounded-md ring-2 ring-border  transition-all">
                            <Image
                              src={anime.images?.jpg?.large_image_url ||
                                anime.picture ||
                                anime.thumbnail ||

                                "/no-img.png"
                              }
                              fill
                              alt={anime?.title || "Anime"}
                              className="object-cover"

                            />
                          </div>

                          {/* Anime Info */}
                          <div className="flex flex-col ">
                            <p className="text-md font-semibold  transition-colors line-clamp-2">
                              {anime?.title_english || anime?.title_japanese || anime?.title}
                            </p>

                            {
                              anime.type &&
                              (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {anime.type} {anime?.rank || anime && `• ${anime.year} `}
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
      <div className="flex  justify-end ">
        <Button
          variant="secondary"

          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full p-6 transition-all duration-300 bg-accent border "
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />

        </Button>
      </div>
    </header>
  )
}