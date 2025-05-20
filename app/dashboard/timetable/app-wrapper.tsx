"use client"

import { useEffect, useState } from "react"
import TimetableApp from "./timetable-app"
import type { Room, User, Group, Subject, Timeslot, Course } from "@/lib/types"
import { assign } from "@/api/courses"
import toast from "react-hot-toast"

interface TimetableAppWrapperProps {
  initialRooms: Room[]
  initialTeachers: User[]
  initialGroups: Group[]
  initialSubjects: Subject[]
  initialTimeSlots: Timeslot[]
  initialCourses: Course[]
}

export default function TimetableAppWrapper({
  initialRooms,
  initialTeachers,
  initialGroups,
  initialSubjects,
  initialTimeSlots,
  initialCourses,
}: TimetableAppWrapperProps) {
  // Store the data in state so it can be updated by client components
  const [rooms] = useState<Room[]>(initialRooms)
  const [teachers] = useState<User[]>(initialTeachers)
  const [groups] = useState<Group[]>(initialGroups)
  const [subjects] = useState<Subject[]>(initialSubjects)
  const [timeSlots] = useState<Timeslot[]>(initialTimeSlots)
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isLoading, setIsLoading] = useState(false)

  const formatConflicts = (conflicts: any[], type: string) => {
    if (!conflicts || conflicts.length === 0) return null
    
    const items = conflicts.join(', ')
    return `${type}: ${items}`
  }

  const handleUpdateCourse = async (updatedCourse: Course) => {
    setIsLoading(true)
    try {
      const result = await assign(updatedCourse)
      if(result?.success){
        setCourses((prevCourses) => prevCourses.map((course) => (course.id === result.data.id ? result.data : course)))
        setIsLoading(false)
        return { success: true }
      }
      else {
        setIsLoading(false)
        const { roomConflicts, teacherConflicts, groupConflicts } = result.data;
        const roomMessage = formatConflicts(roomConflicts, 'Room conflicts');
        const teacherMessage = formatConflicts(teacherConflicts, 'Teacher conflicts');
        const groupMessage = formatConflicts(groupConflicts, 'Group conflicts');
        const messages = [roomMessage, teacherMessage, groupMessage]
        .filter(Boolean)
        .join('\n')

        toast.error(
          (t) => (
            <div className="flex flex-col gap-2">
              <div className="font-bold text-red-700">Assignment Conflicts Detected</div>
              <div className="whitespace-pre-line text-sm">{messages}</div>
              <button 
                onClick={() => toast.dismiss(t.id)}
                className="self-end px-2 py-1 mt-2 text-xs bg-gray-200 hover:bg-gray-300 rounded"
              >
                Dismiss
              </button>
            </div>
          ),
          {
            duration: 3000,
            style: {
              maxWidth: '400px',
              padding: '12px'
            }
          }
        )

        return { success: false }
      }
    } catch (error) {
      console.error("Failed to update course:", error)
      setIsLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: number) => {
    // setIsLoading(true)
    // try {
    //   const success = await deleteCourse(courseId)
    //   if (success) {
    //     setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
    //   }
    // } catch (error) {
    //   console.error("Failed to delete course:", error)
    //   // Handle error
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <TimetableApp
      rooms={rooms}
      teachers={teachers}
      groups={groups}
      subjects={subjects}
      timeSlots={timeSlots}
      courses={courses}
      setCourses={setCourses}
      onUpdateCourse={handleUpdateCourse}
      onDeleteCourse={handleDeleteCourse}
      isLoading={isLoading}
    />
  )
}
