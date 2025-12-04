import Footer from "../components/commons/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <SidebarProvider defaultOpen={true}  >
    //   <AppSidebar />
    //   <SidebarInset>
        <div>


          {/* <Header /> */}


          <main className="flex flex-1 flex-col pt-0 ">

            <div className="w-full  mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        // 
    //   </SidebarInset>
    // </SidebarProvider>
  );
}