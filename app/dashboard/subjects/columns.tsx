"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Subject } from "@/lib/types"
import EditSubject from "./editSubject"
import { DeleteSubject } from "./deleteSubject"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Subject>[] = [
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