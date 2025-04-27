import { DataTable } from "@/components/data-table";
import { MyUser, Semester } from "@/lib/types";
import { getToken } from "@/api/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getFacultySemesters } from "@/api/semesters";
import { columns } from "./columns";

export const metadata: Metadata = {
    title: "Semesters Archive"
}

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const semestes: Semester[] = await getFacultySemesters(faculty_id) 
        return (
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-lg font-semibold">Semesters Archive</h2>
                    </div>
                    <DataTable columns={columns} data={semestes} />
                </div>
        )
    }
    else redirect("/dashboard")
}