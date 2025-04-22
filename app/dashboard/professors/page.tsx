import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import AddProfessor from "./addProfessor";
import { getToken } from "@/api/auth";
import { getUserFaculty } from "@/api/faculty";
import { Faculty, MyUser, User } from "@/lib/types";
import { getFacultyTeachers } from "@/api/users";
import { redirect } from "next/navigation";

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const teachers: User[] = await getFacultyTeachers(faculty_id)
        return <>
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-semibold">Professors List</h2>
                    <AddProfessor id={faculty_id}/>
                </div>

                <DataTable columns={columns} data={teachers} searchColumn="fullName" searchPlaceholder="Search by Name or Email" />
            </div>
        </>
    }
        else redirect("/dashboard")
}