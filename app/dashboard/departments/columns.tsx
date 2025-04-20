"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ColumnDef } from "@tanstack/react-table"
import { Department } from "@/lib/types"
import EditDepartment from "./editDepartment"
import { DeleteDepartment } from "./deleteDepartment"

export const columns: ColumnDef<Department>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Department Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const department = row.original
            return (
            <div className="flex items-center space-x-2">
                <EditDepartment department={department} />
                <DeleteDepartment id={department.id} />
            </div>
            )
        },
    },
]