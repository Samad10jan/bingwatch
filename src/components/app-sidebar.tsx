"use client";
import {
  AtomIcon,
  Book,
  BookOpen,
  Frame,
  GalleryVerticalEnd,
  Laugh,
  Tv,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { NavProjects } from "./nav-projects";

// ------------------ ANIME NAV ------------------
const animeData = {
  
  navMain: [
    {
      title: "Anime Types",
      url: "#",
      icon: Tv,
      isActive: true,
      items: [
        { title: "TV", url: "/type/tv" },
        { title: "Movies", url: "/type/movie" },
        { title: "Upcoming", url: "/type/upcoming" },
        { title: "OVA", url: "/type/ova" },
      ],
    },
    {
      title: "Genres",
      url: "/genres",
      icon: Laugh,
      items: [
        { title: "Action", url: "/genres/1" },
        { title: "Adventure", url: "/genres/2" },
        { title: "Drama", url: "/genres/8" },
        { title: "Fantasy", url: "/genres/10" },
        { title: "Horror", url: "/genres/14" },
      ],
    },
  ],

  projects: [
    {
      name: "BingRead",
      url: "/mangas",
      icon: Book,
    },
  ],
};

// ------------------ MANGA NAV ------------------
const mangaData = {
  
  navMain: [
    {
      title: "Manga Types",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        { title: "Manhwa", url: "/mangas/type/manhwa" },
        { title: "Lightnovel", url: "/mangas/type/lightnovel" },
        { title: "Oneshot", url: "/mangas/type/oneshot" },
        { title: "Manhua", url: "/mangas/type/manhua" },
      ],
    },
    {
      title: "Genres",
      url: "/mangas/genres",
      icon: Laugh,
      items: [
        { title: "Action", url: "/mangas/genres/1" },
        { title: "Adventure", url: "/mangas/genres/2" },
        { title: "Drama", url: "/mangas/genres/8" },
        { title: "Horror", url: "/mangas/genres/14" },
      ],
    },
  ],

  projects: [
    {
      name: "BingWatch",
      url: "/",
      icon: AtomIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const path = usePathname();


  const activeData = path.startsWith("/mangas") ? mangaData : animeData;

  return (
    <Sidebar collapsible="icon" {...props} className="overflow-hidden">
      <div className="items-center justify-between px-3 py-2 hidden md:flex lg:flex xl:flex">
        <SidebarTrigger className="rounded-full border p-2 hover:bg-accent transition" />
      </div>

      {/* HEADER CARD */}
      <Card
        className="ml-2 flex bg-blur  !flex-row items-center  rounded-t-4xl border-0 border-t-2 shadow-none p-0 transition-all duration-300 cursor-pointer hover:scale-[1.05]"
      >
        <Image
          src={path.startsWith("/mangas") ? "/OIPM.jpg" : "/OIP.png"}
          alt="logo"
          width={70}
          height={70}
          className="object-cover rounded-full border-4"
          priority
          onClick={() =>{path.startsWith("/mangas")? router.push("/mangas"):router.push("/")}}
        />
        <p className=" text-2xl font-bold !mr-10 transition-all bg-gradient-to-bl from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
          {path.startsWith("/mangas") ? "BIngeReAd" : "BIngeWatcH"}
        </p>
      </Card>

      <SidebarContent className="md:**:text-lg">
        <NavMain items={activeData.navMain} />
        <NavProjects projects={activeData.projects} />
      </SidebarContent>

      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
