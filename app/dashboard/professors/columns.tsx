"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/types"
import EditProfessor from "./editProfessor"
import { DeleteProfessor } from "./deleteProfessor"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected()
                    ? true
                    : table.getIsSomePageRowsSelected()
                    ? "indeterminate"
                    : false
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="mx-4"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
    accessorKey: "fullName",
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
            <AvatarFallback>{professor.firstName.charAt(0)}{professor.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{professor.fullName}</span>
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
    accessorKey: "phone",
    header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium"
        >
        Phone Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
    },
    {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const professor = row.original
        return (
        <div className="flex items-center space-x-2">
            <EditProfessor teacher={professor} />
            <DeleteProfessor id={professor.id}/>
        </div>
        )
    },
    },
]