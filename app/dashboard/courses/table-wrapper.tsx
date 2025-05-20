"use client"

import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Course } from "@/lib/types"
import AddCourse from "./addCourse"
import { deleteSelectedCourses } from "@/api/courses"
import ImportCourses from "./importCourses"

export function TableWrapper({data}: { data: Course[]}){
    const handleDeleteSelected = async (selectedRowIds: number[]) => {
        const state = await deleteSelectedCourses(selectedRowIds)
        return state
    }
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">Courses List</h2>
            <div className="flex gap-2">
                <ImportCourses/>
                <AddCourse/>
            </div>
        </div>
        <DataTable 
            columns={columns}
            data={data}
            onDeleteSelected={handleDeleteSelected}
        />
    </div>
</>
}