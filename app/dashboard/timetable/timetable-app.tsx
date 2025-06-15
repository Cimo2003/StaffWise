"use client"

import type React from "react"

import { useState } from "react"
import TimetableHeader from "./timetable-header"
import TimetableView from "./timetable-view"
import UnassignedCourses from "./unassigned-courses"
import type { Course, ViewType, Timeslot, Room, User, Group, Subject } from "@/lib/types"
import toast from "react-hot-toast"
import ExportButton2 from "@/components/export-button"
import { UnassignAll } from "./unassignAll"
import { Generate } from "./generate"
import AddCourse from "../courses/addCourse"

interface TimetableAppProps {
  rooms: Room[]
  teachers: User[]
  groups: Group[]
  subjects: Subject[]
  timeSlots: Timeslot[]
  courses: Course[]
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
  onUpdateCourse: (course: Course) => Promise<any>
  isLoading: boolean
}

export default function TimetableApp({
  rooms,
  teachers,
  groups,
  subjects,
  timeSlots,
  courses,
  setCourses,
  onUpdateCourse,
  isLoading,
}: TimetableAppProps) {
  const [viewType, setViewType] = useState<ViewType>("room")
  const [draggedCourse, setDraggedCourse] = useState<number | null>(null)

  const handleCourseMove = async (courseId: number, newTimeslot: Timeslot, newRoomId?: number) => {
    const courseToUpdate = courses.find((course) => course.id === courseId)
    if (!courseToUpdate) return

    const updatedCourse = {
      ...courseToUpdate,
      timeslot: newTimeslot,
    }

    if (newRoomId && viewType === "room") {
      const room = rooms.find((r) => r.id === newRoomId) || null
      updatedCourse.room = room
      if(updatedCourse.type!==updatedCourse.room?.type){
        toast.error("Room type conflict detected!")
        return
      }
    }
    setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? updatedCourse : course)))

    const state = await onUpdateCourse(updatedCourse)
    if(!state.success) setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? courseToUpdate : course)))
  }

  const handleUnassign = async (courseId: number) => {
    const courseToUpdate = courses.find((course) => course.id === courseId)
    if (!courseToUpdate) return

    const updatedCourse = {
      ...courseToUpdate,
      timeslot: null,
      room: null
    }

    setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? updatedCourse : course)))

    await onUpdateCourse(updatedCourse)
  }

  const handleAssignAll = (courses: Course[]) => {
    setCourses(courses)
  }

  const handleDragStart = (courseId: number) => {
    setDraggedCourse(courseId)
  }

  const handleDragEnd = () => {
    setDraggedCourse(null)
  }

  const handleDrop = (timeslot: Timeslot, rowId: number) => {
    if (draggedCourse !== null) {
      handleCourseMove(draggedCourse, timeslot, rowId)
      setDraggedCourse(null)
    }
  }

  const assignedCourses = courses.filter((course) => course.timeslot!==null)
  const unassignedCourses = courses.filter((course) => course.timeslot===null)

  return (
    <div className="container mx-auto px-4 py-6 max-w-[76lvw]">
      <h1 className="text-2xl font-bold mb-4">Faculty Scheduling Timetable</h1>
      <AddCourse/>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Unassigned Courses</h2>
        <UnassignedCourses
          courses={unassignedCourses}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUnassign={handleUnassign}
        />
      </div>
      <h2 className="text-lg font-semibold mb-3">Timetable</h2>
      <div className="flex items-center justify-between gap-2 w-full mb-4 bg-gray-100 rounded-md">
          <TimetableHeader
            viewType={viewType}
            setViewType={setViewType}
            isLoading={isLoading}
          />
          <div className="flex gap-2 px-4">
            <Generate onGenerate={handleAssignAll}/>
            <UnassignAll onUnassign={handleAssignAll}/>
            <ExportButton2
              viewType={viewType}
              courses={courses}
              rooms={rooms}
              teachers={teachers}
              groups={groups}
              timeSlots={timeSlots}
            />
          </div>
          
      </div>
        
      <TimetableView
        viewType={viewType}
        courses={assignedCourses}
        rooms={rooms}
        teachers={teachers}
        groups={groups}
        timeSlots={timeSlots}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggedCourseId={draggedCourse}
      />
    </div>
  )
}
