"use client"
import { Pencil, Trash2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Room } from "@/lib/types"
import EditRoom from "./editRoom"
import { DeleteRoom } from "./deleteRoom"

export const columns: ColumnDef<Room>[] = [
    {
        accessorKey: "code",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Room
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium"
            >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const type = row.original.type
            return  <div className="flex">
                <div className={`${type==="STANDARD"? "bg-orange-400" : type==="LAB"? "bg-green-500" : "bg-primary" } text-white text-center px-3 rounded-lg`}>{type}</div>
            </div>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const room = row.original
            return (
            <div className="flex items-center space-x-2">
                <EditRoom room={room}/>
                <DeleteRoom id={room.id}/>
            </div>
            )
        },
    },
]