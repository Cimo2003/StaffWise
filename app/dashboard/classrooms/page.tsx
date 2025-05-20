import { getToken } from "@/api/auth";
import { MyUser, Room } from "@/lib/types";
import { getFacultyRooms } from "@/api/classrooms";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { TableWrapper } from "./table-wrapper";

export const metadata: Metadata = {
    title: "Rooms"
  }

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const rooms: Room[] = await getFacultyRooms(faculty_id)
        return <TableWrapper facultyId={faculty_id} data={rooms} />
    }
    else redirect("/dashboard")
}