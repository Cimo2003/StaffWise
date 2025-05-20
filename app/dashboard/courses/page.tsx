import { Metadata } from "next"
import { redirect } from "next/navigation"
import { DataProvider } from "@/app/dashboard/timetable/dataContext"
import { Course, Group, MyUser, Semester, Subject, User } from "@/lib/types"
import { getToken } from "@/api/auth"
import { getFacultyGroups } from "@/api/groups"
import { getFacultySubjects } from "@/api/subjects"
import { getFacultyTeachers } from "@/api/users"
import { TableWrapper } from "./table-wrapper"
import { getCurrentSemesterCourses } from "@/api/courses"
import { getCurrentSemester } from "@/api/semesters"

export const metadata: Metadata = {
    title: "Courses"
  }

  export default async function Page() {
      const { faculty_id }: MyUser = await getToken()
      if(faculty_id){
          const currentSemesterPromise: Promise<Semester> = getCurrentSemester(faculty_id)
          const groupsPromise: Promise<Group[]> = getFacultyGroups(faculty_id)
          const subjectsPromise: Promise<Subject[]> = getFacultySubjects(faculty_id)
          const teachersPromise: Promise<User[]> = getFacultyTeachers(faculty_id)
          const coursesPromise: Promise<Course[]> = getCurrentSemesterCourses(faculty_id)
          const [ 
            currentSemester,
            groups,
            subjects,
            teachers,
            courses
           ] = await Promise.all([
            currentSemesterPromise,
            groupsPromise,
            subjectsPromise,
            teachersPromise,
            coursesPromise
           ])
          return (
              <DataProvider semesterId={currentSemester.id} groups={groups} subjects={subjects} teachers={teachers}>
                  <TableWrapper data={courses} />
              </DataProvider>
          )
      }
      else redirect("/dashboard")
  }