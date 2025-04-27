import { DataTable } from "@/components/data-table";
import { Department, Faculty, MyUser, Section } from "@/lib/types";
import { getToken } from "@/api/auth";
import { getFacultySections } from "@/api/sections";
import { columns } from "./columns";
import AddSection from "./addSection";
import { getFacultyDepartments } from "@/api/departments";
import { redirect } from "next/navigation";
import { DataProvider } from "./dataContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sections"
}

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const departments: Department[] = await getFacultyDepartments(faculty_id)
        const sections: Section[] = await getFacultySections(faculty_id) 
        return (
            <DataProvider departments={departments}>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-lg font-semibold">Sections List</h2>
                        <AddSection/>
                    </div>
                    <DataTable columns={columns} data={sections} searchColumn="name" searchPlaceholder="Search by Name" />
                </div>
            </DataProvider>
        )
    }
    else redirect("/dashboard")
}