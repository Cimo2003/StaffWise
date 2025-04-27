"use client"

import { LayoutDashboard, Users, School, Building2, BookOpen, BookOpenText, Calendar, CalendarFold } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

const items = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard/> },
    { label: "Professors", href: "/dashboard/professors", icon: <Users /> },
    { label: "Classrooms", href: "/dashboard/classrooms", icon: <School /> },
    { label: "Departments", href: "/dashboard/departments", icon: <Building2 /> },
    { label: "Sections", href: "/dashboard/sections", icon: <Building2 /> },
    { label: "Courses", href: "/dashboard/courses", icon: <BookOpen /> },
    { label: "Subjects", href: "/dashboard/subjects", icon: <BookOpenText /> },
    { label: "Groups", href: "/dashboard/groups", icon: <Users /> },
    { label: "Semesters", href: "/dashboard/semesters", icon: <CalendarFold /> },
]

export function NavLinks(){
    const pathname = usePathname()
    return  <SidebarMenu className="p-2">
        {
            items.map(i=>(
                <SidebarMenuItem key={i.label}>
                <SidebarMenuButton asChild isActive={pathname===i.href} tooltip={i.label}>
                    <Link href={i.href} className="flex items-center">
                    {i.icon}
                    <span>{i.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))
        }
    </SidebarMenu>
}