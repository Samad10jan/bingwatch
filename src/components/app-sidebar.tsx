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

// 🎬 Anime Dashboard Sidebar Data
const data = {
  user: {
    name: "AnimeWatcher",
    email: "otaku@example.com",
    avatar: "/avatars/anime-user.jpg",
  },
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
          url: "/anime/tv",
        },
        {
          title: "OVA",
          url: "/anime/ova",
        },
        {
          title: "Movies",
          url: "/anime/movies",
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
      <SidebarHeader >
       <Avatar className="size-auto max-w-15 max-h-15 min-w-5 min-h-5"  >
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  />
        <AvatarFallback>CN</AvatarFallback>
       
      </Avatar>
      
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar >
  );
}
