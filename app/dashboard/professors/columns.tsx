"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ColumnDef } from "@tanstack/react-table"
export type Professor = {
    id: number
    name: string
    avatar: string
    email: string
    courses: number
}

export const columns: ColumnDef<Professor>[] = [
    {
    accessorKey: "name",
    header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium"
        >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
        const professor = row.original
        return (
        <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={professor.avatar} alt={professor.name} />
            <AvatarFallback>{professor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{professor.name}</span>
        </div>
        )
    },
    },
    {
    accessorKey: "email",
    header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium"
        >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    },
    {
    accessorKey: "courses",
    header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium"
        >
        Courses
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
        const courses = row.original.courses
        return <span className="bg-[#fff0e7] text-[#f97316] px-2 py-1 rounded-md text-sm">{courses} Courses</span>
    },
    },
    {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const professor = row.original
        return (
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil size={16} className="text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 size={16} className="text-gray-500" />
            </Button>
        </div>
        )
    },
    },
]