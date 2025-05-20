"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Section } from "@/lib/types";
import { deleteSelectedSections } from "@/api/sections";
import AddSection from "./addSection";
import ImportSections from "./importSections";

export function TableWrapper({facultyId, data}: { facultyId: number, data: Section[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedSections(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Sections List</h2>
            <div className="flex gap-2">
                <ImportSections id={facultyId} />
                <AddSection/>
            </div>
        </div>
        <DataTable 
            columns={columns} 
            data={data} 
            searchColumn="name" 
            searchPlaceholder="Search by Name"
            onDeleteSelected={handleDeleteSelected} 
        />
    </div>
</>
}