"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Department } from "@/lib/types";
import { deleteSelectedDepartments } from "@/api/departments";
import AddDepartment from "./addDepartment";
import ImportDepartments from "./importDepartments";

export function TableWrapper({facultyId, data}: { facultyId: number, data: Department[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedDepartments(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Departments List</h2>
            <div className="flex gap-2">
                <ImportDepartments id={facultyId} />
                <AddDepartment id={facultyId} />
            </div>
        </div>
        <DataTable 
            columns={columns} 
            data={data} 
            searchColumn="name" 
            searchPlaceholder="Search by name" 
            onDeleteSelected={handleDeleteSelected} 
        />
    </div>
</>
}