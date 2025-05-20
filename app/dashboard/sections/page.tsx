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
import { TableWrapper } from "./table-wrapper";

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
                <TableWrapper data={sections} facultyId={faculty_id} />
            </DataProvider>
        )
    }
    else redirect("/dashboard")
}