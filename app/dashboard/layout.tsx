import { getToken } from "@/api/auth";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/hooks/userContext";
import { MyUser } from "@/lib/types";
import localFont from "next/font/local";

// Define the local font with both regular and italic variants
const shantellSans = localFont({
  src: [
    {
      path: '../../public/fonts/ShantellSans-VariableFont_BNCE,INFM,SPAC,wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ShantellSans-Italic-VariableFont_BNCE,INFM,SPAC,wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-shantell-sans', // For CSS variable usage
})


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: MyUser = await getToken()
  return (
    <SidebarProvider >
      <UserProvider user={user}>
      <div className={`flex h-screen w-full overflow-hidden`}>
        <AppSidebar />
        <SidebarInset className="flex-1 bg-[#f9fafb] content-transition">
          <Header/>
          <main className="flex-1 overflow-y-auto p-4">
            { children }
          </main>
        </SidebarInset>
      </div>
      </UserProvider>
    </SidebarProvider>
  );
}