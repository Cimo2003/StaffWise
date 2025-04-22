import { getToken } from "@/api/auth";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/hooks/userContext";
import { MyUser } from "@/lib/types";
import { Shantell_Sans } from "next/font/google";

const shantell_Sans = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: MyUser = await getToken()
  return (
    <SidebarProvider>
      <UserProvider user={user}>
      <div className={`${shantell_Sans.className} antialiased flex h-screen w-full overflow-hidden`}>
        <AppSidebar />
        <SidebarInset className="flex-1 bg-[#f9fafb] content-transition">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            { children }
          </main>
        </SidebarInset>
      </div>
      </UserProvider>
    </SidebarProvider>
  );
}
