"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { User } from "@/lib/types";
import { deleteSelectedTeachers } from "@/api/users";
import ImportProfessors from "./importProfessors";
import AddProfessor from "./addProfessor";

export function TableWrapper({facultyId, data}: { facultyId: number, data: User[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedTeachers(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Professors List</h2>
            <div className="flex gap-2">
                <ImportProfessors id={facultyId} />
                <AddProfessor id={facultyId} />
            </div>
        </div>
        <DataTable 
        columns={columns} 
        data={data} 
        searchColumn="fullName" 
        searchPlaceholder="Search by Name"
        onDeleteSelected={handleDeleteSelected}
        />
    </div>
</>
}