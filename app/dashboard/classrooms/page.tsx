import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { getUserFaculty } from "@/api/faculty";
import { getToken } from "@/api/auth";
import { Faculty, MyUser, Room } from "@/lib/types";
import { getFacultyRooms } from "@/api/classrooms";
import AddRoom from "./addRoom";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rooms"
  }

export default async function Page() {
    const { faculty_id }: MyUser = await getToken()
    if(faculty_id){
        const rooms: Room[] = await getFacultyRooms(faculty_id)
        return <>
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-semibold">Rooms List</h2>
                    <AddRoom id={faculty_id} />
                </div>
                <DataTable columns={columns} data={rooms} searchColumn="code" searchPlaceholder="Search by Name" />
            </div>
        </>
    }
    else redirect("/dashboard")
}