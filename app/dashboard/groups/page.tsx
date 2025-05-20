import { Group, MyUser, Section } from "@/lib/types";
import { getToken } from "@/api/auth";
import { getFacultySections } from "@/api/sections";
import { getFacultyGroups } from "@/api/groups";
import { redirect } from "next/navigation";
import { DataProvider } from "./dataContext";
import { Metadata } from "next";
import { TableWrapper } from "./table-wrapper";

export const metadata: Metadata = {
    title: "Groups"
}

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const sections: Section[] = await getFacultySections(faculty_id)
        const groups: Group[] = await getFacultyGroups(faculty_id)
        return (
            <DataProvider sections={sections}>
                <TableWrapper data={groups} facultyId={faculty_id} />
            </DataProvider>
        )
    }
    else redirect("/dashboard")
}