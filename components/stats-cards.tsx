import type React from "react"
import { Building2, BookOpen, School, Users } from "lucide-react"
import { countActiveFacultyCourses, countFacultyDepartments, countFacultyRooms, countFacultyTeachers } from "@/api/faculty"

export async function StatsCards({facultyId}: {facultyId: number}) {
  const [
    countRooms,
    countTeachers,
    countDepartments,
    countActiveCourses
  ] = await Promise.all([
    countFacultyRooms(facultyId),
    countFacultyTeachers(facultyId),
    countFacultyDepartments(facultyId),
    countActiveFacultyCourses(facultyId)
  ])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Professors"
        value={countTeachers}
        icon={<Users color="#4480fc" size={24} />}
        bgColor="bg-[#eff6ff]"
      />
      <StatCard
        title="Classrooms"
        value={countRooms}
        icon={<School color="#16b682" size={24} />}
        bgColor="bg-[#ecfdf5]"
      />
      <StatCard
        title="Departments"
        value={countDepartments}
        icon={<Building2 color="#8b5df4" size={24} />}
        bgColor="bg-[#f5f3ff]"
      />
      <StatCard
        title="Active Courses"
        value={countActiveCourses}
        icon={<BookOpen color="#f2731b" size={24}/>}
        bgColor="bg-[#fff5e9]"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  bgColor: string
}

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
      <div>
        <p className="text-[#6b7280] text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>{icon}</div>
    </div>
  )
}

