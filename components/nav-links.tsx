"use client"

import { LayoutDashboard, Users, School, Building2, BookOpen, BookOpenText, Calendar, CalendarFold } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { MyUser } from "@/lib/types"
import { useUser } from "@/hooks/userContext"

const items = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard/> },
    { label: "Professors", href: "/dashboard/professors", icon: <Users />, authority:"ADMIN" },
    { label: "Groups", href: "/dashboard/groups", icon: <Users />, authority:"ADMIN" },
    { label: "Classrooms", href: "/dashboard/classrooms", icon: <School />, authority:"ADMIN" },
    { label: "Departments", href: "/dashboard/departments", icon: <Building2 />, authority:"ADMIN" },
    { label: "Sections", href: "/dashboard/sections", icon: <Building2 />, authority:"ADMIN" },
    { label: "Subjects", href: "/dashboard/subjects", icon: <BookOpenText />, authority:"ADMIN" },
    { label: "Courses", href: "/dashboard/courses", icon: <BookOpen />, authority:"ADMIN" },
    { label: "Timetable", href: "/dashboard/timetable", icon: <Calendar />, authority:"ADMIN" },
    { label: "Semesters", href: "/dashboard/semesters", icon: <CalendarFold />, authority:"ADMIN" },
]

export function NavLinks(){
    const pathname = usePathname()
    const user: MyUser = useUser()
    console.log(user)
    return  <SidebarMenu className="p-2">
        {
            items.map(i=>
                (user.role.find(r=>r.authority===i.authority)!=undefined
                ||
                i.authority===undefined)
                &&
                (
                   <SidebarMenuItem key={i.label}>
                        <SidebarMenuButton asChild isActive={pathname===i.href} tooltip={i.label}>
                            <Link href={i.href} className="flex items-center">
                            {i.icon}
                            <span>{i.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem> 
                )
            )
        }
    </SidebarMenu>
}