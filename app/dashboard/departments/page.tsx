import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { getFacultyDepartments } from "@/api/departments";
import { Faculty, MyUser } from "@/lib/types";
import { getToken } from "@/api/auth";
import { getUserFaculty } from "@/api/faculty";
import AddDepartment from "./addDepartment";

export default async function Page() {
    const user: MyUser = await getToken()
    const faculty: Faculty = await getUserFaculty(user.user_id)
    const departments = await getFacultyDepartments(faculty.id)
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-semibold">Departments List</h2>
                <AddDepartment id={faculty.id} />
            </div>
            <DataTable columns={columns} data={departments} searchColumn="name" searchPlaceholder="Search by Name" />
        </div>
    )
}