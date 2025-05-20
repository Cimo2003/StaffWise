import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import AddProfessor from "./addProfessor";
import { getToken } from "@/api/auth";
import { MyUser, User } from "@/lib/types";
import { getFacultyTeachers } from "@/api/users";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { TableWrapper } from "./table-wrapper";

export const metadata: Metadata = {
    title: "Professors"
}

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const teachers: User[] = await getFacultyTeachers(faculty_id)
        return <TableWrapper data={teachers} facultyId={faculty_id} />
    }
        else redirect("/dashboard")
}