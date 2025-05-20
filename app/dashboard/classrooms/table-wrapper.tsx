"use client"

import { Room } from "@/lib/types";
import ImportRooms from "./importRooms";
import AddRoom from "./addRoom";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { deleteSelectedRooms } from "@/api/classrooms";

export function TableWrapper({facultyId, data}: { facultyId: number, data: Room[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedRooms(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Rooms List</h2>
            <div className="flex gap-2">
                <ImportRooms id={facultyId}/>
                <AddRoom id={facultyId} />
            </div>
        </div>
        <DataTable 
            columns={columns} 
            data={data} 
            searchColumn="code" 
            searchPlaceholder="Search by Code" 
            onDeleteSelected={handleDeleteSelected} 
        />
    </div>
</>
}