import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} >
      <AppSidebar />
      <SidebarInset>

        <Header />


        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}