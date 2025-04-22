import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { getUserFaculty } from "@/api/faculty";
import { getToken } from "@/api/auth";
import { Faculty, MyUser, Subject } from "@/lib/types";
import { getFacultySubjects } from "@/api/subjects";
import AddSubject from "./addSubject";
import { redirect } from "next/navigation";

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const subjects: Subject[] = await getFacultySubjects(faculty_id)
        return <>
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-semibold">Subjects List</h2>
                    <AddSubject id={faculty_id} />
                </div>
                <DataTable columns={columns} data={subjects} searchColumn="title" searchPlaceholder="Search by Name" />
            </div>
        </>
    }
    else redirect("/dashboard")
}