"use client";
import {
  GalleryVerticalEnd,
  Tv
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";

// 🎬 Anime Dashboard Sidebar Data
const data = {
  // user: {
  //   name: "AnimeWatcher",
  //   email: "otaku@example.com",
  //   avatar: "/avatars/anime-user.jpg",
  // },
  teams: [
    {
      name: "BingWatch Studio",
      logo: GalleryVerticalEnd,
      plan: "Premium",
    },

  ],

  // 🔹 MAIN NAVIGATION
  navMain: [
    {
      title: "Anime Types",
      url: "#",
      icon: Tv,
      isActive: true,
      items: [

        {
          title: "TV",
          url: "/type/tv",
        },
        {
          title: "Movies",
          url: "/type/movie",
        },
        {
          title: "Upcoming",
          url: "/type/upcoming",
        },
        {
          title: "OVA",
          url: "/type/ova",
        },

      ],
    },
    // {
    //   title: "Genres",
    //   url: "/genres",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Adventure",
    //       url: "/anime/adventure",
    //     },
    //     {
    //       title: "Award Winning",
    //       url: "/anime/award-winning",
    //     },
    //     {
    //       title: "Action",
    //       url: "/anime/action",
    //     },
    //     {
    //       title: "Comedy",
    //       url: "/anime/comedy",
    //     },
    //   ],
    // },
    // {
    //   title: "Favorites",
    //   url: "/favorites",
    //   icon: Star,
    //   items: [
    //     {
    //       title: "My Watchlist",
    //       url: "/favorites/watchlist",
    //     },
    //     {
    //       title: "Recently Watched",
    //       url: "/favorites/recent",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "/settings",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "/settings/profile",
    //     },
    //     {
    //       title: "Notifications",
    //       url: "/settings/notifications",
    //     },
    //   ],
    // },
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  return (
    <Sidebar collapsible="icon" {...props} className="overflow-hidden"  >
      <div className="items-center justify-between px-3 py-2 hidden md:flex lg:flex xl:flex">
        <SidebarTrigger className="rounded-full border p-2 hover:bg-accent transition " />
      </div>

      <Card className="flex bg-blur !flex-row items-center justify-between rounded-t-4xl border-0 border-t-2 shadow-none p-0  transition-all duration-300 cursor-pointer hover:scale-[1.05] hover:bg-gradient-to-b hover:from-yellow-200/40 hover:to-transparent " >
        <Image src={"/OIP.png"} alt="a" width={70} height={70} className="rounded-full border-4 border-yellow-400" priority onClick={() => { if (!(window.location.pathname === "/")) { router.push("/") } }} />
        <p className="truncate text-2xl font-bold text-center mr-5 transition-all duration-300 bg-gradient-to-bl from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
          BIngWatcH
        </p>
      </Card>

      <SidebarContent className="md:**:text-lg">

        <NavMain items={data.navMain} />

      </SidebarContent>

      <SidebarFooter>

        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar >
  );
}
