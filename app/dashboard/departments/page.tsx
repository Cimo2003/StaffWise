import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { getFacultyDepartments } from "@/api/departments";
import { MyUser } from "@/lib/types";
import { getToken } from "@/api/auth";
import AddDepartment from "./addDepartment";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Departments"
  }

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const departments = await getFacultyDepartments(faculty_id)
        return (
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-semibold">Departments List</h2>
                    <AddDepartment id={faculty_id} />
                </div>
                <DataTable columns={columns} data={departments} searchColumn="name" searchPlaceholder="Search by Name" />
            </div>
        )
    }
    else redirect("/dashboard")
}