import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Course, Group, MyUser, Room, Subject, User } from "@/lib/types"
import { getToken } from "@/api/auth"
import { getFacultyGroups } from "@/api/groups"
import { getFacultySubjects } from "@/api/subjects"
import { getFacultyTeachers } from "@/api/users"
import { getCurrentSemesterCourses } from "@/api/courses"
import { DataProvider } from "./dataContext"
import { getFacultyRooms } from "@/api/classrooms"
import { Suspense } from "react"
import TimetableAppWrapper from "./app-wrapper"
import { getTimeSlots } from "@/api/timeslots"
import { getCurrentSemester } from "@/api/semesters"

export const metadata: Metadata = {
  title: "Courses Timetable"
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading timetable data...</p>
      </div>
    </div>
  )
}

export default async function Page() {
  const { faculty_id }: MyUser = await getToken()
  if(faculty_id){
    const [rooms, teachers, groups, subjects, timeSlots, initialCourses, currentSemester] = await Promise.all([
      getFacultyRooms(faculty_id),
      getFacultyTeachers(faculty_id),
      getFacultyGroups(faculty_id),
      getFacultySubjects(faculty_id),
      getTimeSlots(),
      getCurrentSemesterCourses(faculty_id),
      getCurrentSemester(faculty_id)
    ])
      return (
        <DataProvider semesterId={currentSemester?.id} rooms={rooms} groups={groups} subjects={subjects} teachers={teachers}>
        <Suspense fallback={<Loading />}>
          <TimetableAppWrapper
            initialRooms={rooms}
            initialTeachers={teachers}
            initialGroups={groups}
            initialTimeSlots={timeSlots}
            initialCourses={initialCourses}
          />
        </Suspense>
        </DataProvider>
      )
  }
  else redirect("/dashboard")
}