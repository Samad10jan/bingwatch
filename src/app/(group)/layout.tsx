import Image from "next/image";
import { Header } from "../components/header";
import { Sidebar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Sidebarr from "../components/sidebarr";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {/* <Header /> */}
      <Sidebarr>



        <div className="w-[80vw] mx-auto ">

          {children}
        </div>
      </Sidebarr>

    </div>
  )
}