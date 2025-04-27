import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { NavLinks } from "./nav-links"
import { getToken } from "@/api/auth"
import { NavUser } from "./nav-user"
import { MyUser } from "@/lib/types"
import Link from "next/link"

export async function AppSidebar() {
  const user: MyUser = await getToken()
  return (
    <Sidebar collapsible="icon" className="sidebar-transition">
      <SidebarHeader className="bg-gradient-to-r to-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href={"/dashboard"} className="flex items-center">
                <Image
                  src="/mainLogo.png"
                  alt="Staff Wise Logo"
                  width={32}
                  height={32}
                  className="text-primary"
                />
                <span className="ml-2 font-semibold text-[#5b5857]">StaffWise</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-r to-white">
        <NavLinks/>
      </SidebarContent>
      <SidebarFooter className="border-t border-border bg-gradient-to-r to-white">
        <SidebarMenu>
          <NavUser user={user}/>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

