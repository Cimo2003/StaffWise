"use client"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Course } from "@/lib/types"
import { DeleteCourse } from "./deleteCourse"
import EditCourse from "./editCourse"


export const columns: ColumnDef<Course>[] = [
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
        accessorKey: "subject.title",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Subject
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "teacher.fullName",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Professor
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "groups",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Groups
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const groups = row.original.groups
            return <div className="grid grid-cols-2 gap-1">
                { groups.map(g=>(
                    <div key={g.id} className={`bg-amber-400 text-white text-center text-xs px-2 rounded-lg normal-case`}>{g.code}-{g.section.level}</div>
                )) }
            </div>
        }
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Course Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const type = row.original.type
            return  <div className="flex">
                <div className={`${type==="STANDARD"? "bg-orange-400" : type==="LAB"? "bg-green-500" : "bg-primary" } text-white text-center px-3 rounded-lg normal-case`}>{type}</div>
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const course = row.original
            return (
            <div className="flex items-center space-x-2">
               <EditCourse course={course} />
               <DeleteCourse id={course.id} />
            </div>
            )
        },
    },
]