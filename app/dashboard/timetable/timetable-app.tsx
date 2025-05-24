"use client"

import type React from "react"

import { useState } from "react"
import TimetableHeader from "./timetable-header"
import TimetableView from "./timetable-view"
import UnassignedCourses from "./unassigned-courses"
import type { Course, ViewType, Timeslot, Room, User, Group, Subject } from "@/lib/types"
import toast, { Toaster } from "react-hot-toast"
import ExportButton2 from "@/components/export-button"

interface TimetableAppProps {
  rooms: Room[]
  teachers: User[]
  groups: Group[]
  subjects: Subject[]
  timeSlots: Timeslot[]
  courses: Course[]
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
  onUpdateCourse: (course: Course) => Promise<any>
  onDeleteCourse: (courseId: number) => Promise<void>
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
  onDeleteCourse,
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

  // Handle unassigning a course
  const handleUnassign = async (courseId: number) => {
    const courseToUpdate = courses.find((course) => course.id === courseId)
    if (!courseToUpdate) return

    const updatedCourse = {
      ...courseToUpdate,
      timeslot: null,
      room: null
    }

    // Optimistically update the UI
    setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? updatedCourse : course)))

    // Then update on the server
    await onUpdateCourse(updatedCourse)
  }

  // Handle drag start
  const handleDragStart = (courseId: number) => {
    setDraggedCourse(courseId)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedCourse(null)
  }

  // Handle drop on a timetable cell
  const handleDrop = (timeslot: Timeslot, rowId: number) => {
    if (draggedCourse !== null) {
      handleCourseMove(draggedCourse, timeslot, rowId)
      setDraggedCourse(null)
    }
  }

  // Filter courses into assigned and unassigned
  const assignedCourses = courses.filter((course) => course.timeslot!==null)
  const unassignedCourses = courses.filter((course) => course.timeslot===null)

  return (
    <div className="container mx-auto px-4 py-6 max-w-[76lvw]">
      <TimetableHeader
        viewType={viewType}
        setViewType={setViewType}
        isLoading={isLoading}
      />

      {/* Unassigned courses section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Unassigned Courses</h2>
        <UnassignedCourses
          courses={unassignedCourses}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUnassign={handleUnassign}
        />
      </div>

      {/* Timetable view */}
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-semibold mb-3">Timetable</h2>
        <ExportButton2
            viewType={viewType}
            courses={courses}
            rooms={rooms}
            teachers={teachers}
            groups={groups}
            timeSlots={timeSlots}
          />
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
