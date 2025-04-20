"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Subject } from "@/lib/types"
import EditSubject from "./editSubject"
import { DeleteSubject } from "./deleteSubject"

export const columns: ColumnDef<Subject>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Subject Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "code",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Code
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const subject = row.original
            return (
            <div className="flex items-center space-x-2">
                <EditSubject subject={subject} />
                <DeleteSubject id={subject.id} />
            </div>
            )
        },
    },
]