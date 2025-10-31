"use client";

import {
  BookOpen,
  GalleryVerticalEnd,
  Settings2,
  Star,
  Tv
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Card } from "./ui/card";

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
          url: "/tv",
        },
        {
          title: "OVA",
          url: "/ova",
        },
        {
          title: "Movies",
          url: "/movie",
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
  return (
    <Sidebar collapsible="icon" {...props} >
      <header className=" flex items-center justify-between mt-5  " >




        <Image src={"/OIP.png"} alt="a" width={70} height={70} className="rounded-full " />
        <p className="truncate text-2xl font-bold text-center mr-5 hover:text-yellow-300 ">BIngWatcH</p>



      </header>

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
