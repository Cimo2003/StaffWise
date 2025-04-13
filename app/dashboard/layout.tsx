import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 bg-[#f9fafb] content-transition">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            { children }
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
