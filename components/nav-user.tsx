"use client"

import {
  ChevronsUpDown,
  LogOut,
  Settings,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { MyUser } from "@/lib/types"
import { logout } from "@/api/auth"
import { redirect } from "next/navigation"
import { logoutAction } from "./logout-action"

export function NavUser({
  user
}: {
  user: MyUser
}) {
  const { isMobile } = useSidebar()

  return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">U</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex space-x-4 py-1">
                  <span className="truncate font-semibold">{user.full_name}</span>
                  <span className="font-medium text-xs">{user.role[0].authority==="ADMIN"? "Administrator" : "Professor"}</span>
                </div>
                <span className="truncate text-2xs">{user.sub}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex space-x-4 py-1">
                    <span className="truncate font-semibold">{user.full_name}</span>
                    <span className="font-medium text-xs">{user.role[0].authority==="ADMIN"? "Administrator" : "Professor"}</span>
                  </div>
                  <span className="truncate text-2xs">{user.sub}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
             <a href="/settings" className="flex items-center">
                <Settings/>
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <button 
                  className="flex items-center hover:cursor-pointer w-full"
                  onClick={async()=>{
                    await logoutAction()
                  }}
                >
                  <LogOut/>
                  <span>Logout</span>
                </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
  )
}
