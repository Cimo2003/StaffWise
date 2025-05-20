"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Group } from "@/lib/types";
import { deleteSelectedGroups } from "@/api/groups";
import ImportGroups from "./importGroups";
import AddGroup from "./addGroup";

export function TableWrapper({facultyId, data}: { facultyId: number, data: Group[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedGroups(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Rooms List</h2>
            <div className="flex gap-2">
                <ImportGroups id={facultyId}/>
                <AddGroup/>
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