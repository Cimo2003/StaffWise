import { DataTable } from "@/components/data-table";
import { columns, Professor } from "./columns";
import AddProfessor from "./addProfessor";
import { getToken } from "@/api/auth";
import { getUserFaculty } from "@/api/faculty";
import { MyUser } from "@/lib/types";

const professors: Professor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah.j@university.edu",
      courses: 4,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "m.chen@university.edu",
      courses: 3,
    },
]

export default async function Page() {
    const user: MyUser = await getToken()
    const faculty = await getUserFaculty(user.user_id)
    return <>
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-semibold">Professors List</h2>
                <AddProfessor id={faculty.id}/>
            </div>

            <DataTable columns={columns} data={professors} searchColumn="name" searchPlaceholder="Search by Name or Email" />
        </div>
    </>
}