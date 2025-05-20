import { getFacultyDepartments } from "@/api/departments";
import { MyUser } from "@/lib/types";
import { getToken } from "@/api/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { TableWrapper } from "./table-wrapper";

export const metadata: Metadata = {
    title: "Departments"
  }

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const departments = await getFacultyDepartments(faculty_id)
        return <TableWrapper facultyId={faculty_id} data={departments} />
    }
    else redirect("/dashboard")
}