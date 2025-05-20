"use client"

import { Subject } from "@/lib/types";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { deleteSelectedSubjects } from "@/api/subjects";
import ImportSubjects from "./importSubjects";
import AddSubject from "./addSubject";

export function TableWrapper({facultyId, data}: { facultyId: number, data: Subject[] }){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedSubjects(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Subjects List</h2>
            <div className="flex gap-2">
                <ImportSubjects id={facultyId} />
                <AddSubject id={facultyId} />
            </div>
        </div>
        <DataTable 
        columns={columns} 
        data={data} 
        searchColumn="title" 
        searchPlaceholder="Search by Name"
        onDeleteSelected={handleDeleteSelected}
        />
    </div>
</>
}