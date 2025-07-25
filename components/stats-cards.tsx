import type React from "react"
import { Building2, BookOpen, School, Users, BookOpenText } from "lucide-react"
import { countActiveFacultyCourses, countFacultyDepartments, countFacultyGroups, countFacultyRooms, countFacultySections, countFacultySubjects, countFacultyTeachers } from "@/api/faculty"
import CountUp from "./ui/CountUp"

export async function StatsCards({facultyId}: {facultyId: number}) {
  const [
    countRooms,
    countTeachers,
    countDepartments,
    countActiveCourses,
    countSubjects,
    countSections,
    countGroups
  ] = await Promise.all([
    countFacultyRooms(facultyId),
    countFacultyTeachers(facultyId),
    countFacultyDepartments(facultyId),
    countActiveFacultyCourses(facultyId),
    countFacultySubjects(facultyId),
    countFacultySections(facultyId),
    countFacultyGroups(facultyId)
    
  ])
  const stats = [
    { title: "Total Professors", value: countTeachers, icon: <Users color="#4480fc" size={24} />, bgColor: "#eff6ff"},
    { title: "Classrooms", value: countRooms, icon: <School color="#16b682" size={24} />, bgColor: "#ecfdf5"},
    { title: "Departments", value: countDepartments, icon: <Building2 color="#8b5df4" size={24} />, bgColor: "#f5f3ff"},
    { title: "Active Courses", value: countActiveCourses, icon: <BookOpen color="#f2731b" size={24}/>, bgColor: "#fff5e9"},
    { title: "Subjects", value: countSubjects, icon: <BookOpenText color="#f2731b" size={24} />, bgColor: "#fff5e9"},
    { title: "Sections", value: countSections, icon: <Building2 color="#8b5df4" size={24} />, bgColor: "#f5f3ff"},
    { title: "Student Groups", value: countGroups, icon: <Users color="#4480fc" size={24} />, bgColor: "#eff6ff"},
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {
        stats.map(s=>(
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            bgColor={`bg-[${s.bgColor}]`}
          />
        ))
      }
      
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
}

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center animate-fade-left animate-once">
      <div>
        <p className="text-[#6b7280] text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">
          <CountUp
            from={0}
            to={value}
            separator=","
            direction="up"
            duration={0.8}
            className="count-up-text"
          />
        </h3>
      </div>
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>{icon}</div>
    </div>
  )
}

