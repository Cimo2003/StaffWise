"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Semester } from "@/lib/types"
import { yearCycle } from "@/lib/date-format"
import EditSemester from "./editSemester"
import { DeleteSemester } from "./deleteSemester"

export const columns: ColumnDef<Semester>[] = [
    {
        accessorKey: "number",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Semester
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const semester = row.original
            return yearCycle(semester)
        }
    },
    {
        accessorKey: "semesterStart",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "semesterEnd",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            End Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const semester = row.original
            return (
            <div className="flex items-center space-x-2">
                <EditSemester semester={semester}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-orange-500">
                <Pencil size={16} />
                </Button>
                </EditSemester>
                <DeleteSemester id={semester.id}/>
            </div>
            )
        },
    },
]