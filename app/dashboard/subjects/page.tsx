import { getToken } from "@/api/auth";
import { MyUser, Subject } from "@/lib/types";
import { getFacultySubjects } from "@/api/subjects";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { TableWrapper } from "./table-wrapper";

export const metadata: Metadata = {
    title: "Subjects"
}

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const subjects: Subject[] = await getFacultySubjects(faculty_id)
        return <TableWrapper facultyId={faculty_id} data={subjects} />
    }
    else redirect("/dashboard")
}