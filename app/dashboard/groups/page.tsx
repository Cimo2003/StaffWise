import { DataTable } from "@/components/data-table";
import { Department, Faculty, Group, MyUser, Section } from "@/lib/types";
import { getToken } from "@/api/auth";
import { getUserFaculty } from "@/api/faculty";
import { getFacultySections } from "@/api/sections";
import { getFacultyDepartments } from "@/api/departments";
import { columns } from "./columns";
import { getFacultyGroups } from "@/api/groups";
import AddGroup from "./addGroup";
import { redirect } from "next/navigation";
import { DataProvider } from "./dataContext";

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const sections: Section[] = await getFacultySections(faculty_id)
        const groups: Group[] = await getFacultyGroups(faculty_id)
        return (
            <DataProvider sections={sections}>
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-semibold">Groups List</h2>
                    <AddGroup/>
                </div>
                <DataTable columns={columns} data={groups} searchColumn="code" searchPlaceholder="Search by Name" />
            </div>
            </DataProvider>
        )
    }
    else redirect("/dashboard")
}