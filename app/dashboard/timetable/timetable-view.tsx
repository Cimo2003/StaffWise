"use client"

import type React from "react"
import { useMemo, useRef, useEffect, useState } from "react"
import type { Course, ViewType, Timeslot, Group, Room, User } from "@/lib/types"
import toast from "react-hot-toast"

interface TimetableViewProps {
  viewType: ViewType
  courses: Course[]
  rooms: Room[]
  teachers: User[]
  groups: Group[]
  timeSlots: Timeslot[]
  onDrop: (timeslot: Timeslot, rowId: number) => void
  onDragStart: (courseId: number) => void
  onDragEnd: () => void
  draggedCourseId: number | null
}

export default function TimetableView({
  viewType,
  courses,
  rooms,
  teachers,
  groups,
  timeSlots,
  onDrop,
  onDragStart,
  onDragEnd,
  draggedCourseId,
}: TimetableViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [isRightDragging, setIsRightDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const rows = useMemo(() => {
    switch (viewType) {
      case "room":
        return rooms
      case "teacher":
        return teachers
      case "group":
        return groups
      default:
        return rooms
    }
  }, [viewType, rooms, teachers, groups])

  const timeSlotsByDay = useMemo(() => {
    const grouped: { [key: string]: Timeslot[] } = {}

    timeSlots.forEach((slot) => {
      if (!grouped[slot.day]) {
        grouped[slot.day] = []
      }
      grouped[slot.day].push(slot)
    })

    return grouped
  }, [timeSlots])

  const days = useMemo(() => Object.keys(timeSlotsByDay), [timeSlotsByDay])

  const getCoursesForCell = (rowId: number, timeslot: Timeslot) => {
    return courses.filter((course) => {
      if (!course.timeslot || course.timeslot.id !== timeslot.id) {
        return false
      }

      switch (viewType) {
        case "room":
          return course.room?.id === rowId
        case "teacher":
          return course.teacher.id === rowId
        case "group":
          return course.groups.some((group) => group.id === rowId)
        default:
          return false
      }
    })
  }

  const handleDrop = (e: React.DragEvent, timeslot: Timeslot, rowId: number, cellCourses: Course[]) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-blue-50")

    if(cellCourses.length<1){
      const courseId = Number.parseInt(e.dataTransfer.getData("text/plain"), 10)
      if (!isNaN(courseId)) {
        onDrop(timeslot, rowId)
      }
    }
    else toast("Conflict Detected!", { position: 'bottom-center', icon:'🚨' })
    
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("bg-blue-50")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-blue-50")
  }

  const formatGroups = (groups: Group[]) => {
    if (!groups || groups.length === 0) return "No groups"
    if (groups.length === 1) return `${groups[0].code}-${groups[0].section.name}`
    return `${groups[0].section.name}`
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2 && scrollContainerRef.current) {
      e.preventDefault()

      setIsRightDragging(true)
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
      setStartY(e.pageY - scrollContainerRef.current.offsetTop)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
      setScrollTop(scrollContainerRef.current.scrollTop)

      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grabbing"
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRightDragging || !scrollContainerRef.current) return

    e.preventDefault()

    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const y = e.pageY - scrollContainerRef.current.offsetTop

    const walkX = (x - startX) * 1.5
    const walkY = (y - startY) * 1.5

    scrollContainerRef.current.scrollLeft = scrollLeft - walkX
    scrollContainerRef.current.scrollTop = scrollTop - walkY
  }

  const handleMouseUp = () => {
    setIsRightDragging(false)

    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "auto"
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    const container = scrollContainerRef.current

    if (container) {
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      className="bg-white rounded-lg shadow overflow-auto max-h-[80vh] max-h-[80vh]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >      
      <table className="min-w-[600px] w-full border-collapse text-sm">        
        <thead>
          <tr>
            <th className="p-1.5 font-medium text-gray-500 border-b border-r text-left text-xs sticky top-0 left-0 z-20 bg-white"
              rowSpan={2}>
              {viewType === "room" ? "Room" : viewType === "teacher" ? "Teacher" : "Group"}
            </th>

            {days.map((day) => {
              const dayTimeSlots = timeSlotsByDay[day]
              return (
                <th
                  key={day}
                  className="border-b border-r text-center font-bold text-gray-700 bg-white text-xs sticky top-0 z-10"
                  colSpan={dayTimeSlots.length}
                >
                  <div className="py-1 px-1.5">{day}</div>
                </th>
              )
            })}
          </tr>

          <tr>
            {days.map((day) => {
              const dayTimeSlots = timeSlotsByDay[day]
              return dayTimeSlots.map((slot) => (
                <th key={slot.id} className="py-1 px-1.5 font-medium text-gray-500 border-b border-r text-center text-[10px] sticky top-6 z-10 bg-gray-50">
                  {slot.fromTime}-{slot.toTime}
                </th>
              ))
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th className="p-1.5 font-medium border-b border-r text-left text-xs sticky left-0 bg-white z-10">
                {viewType === "teacher"
                  ? (row as User).fullName
                  : viewType === "room"
                    ? (row as Room).code
                    : (row as Group).code}
              </th>

              {days.map((day) => {
                const dayTimeSlots = timeSlotsByDay[day]

                return dayTimeSlots.map((slot) => {
                  const cellCourses = getCoursesForCell(row.id, slot)

                  return (
                    <td
                      key={`${row.id}-${slot.id}`}
                      className="border-r border-b min-h-[50px] p-0.5 relative transition-colors hover:bg-gray-50 align-top"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, slot, row.id, cellCourses)}
                    >
                      {cellCourses.map((course) => (
                        <div
                          key={course.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", course.id.toString())
                            onDragStart(course.id)
                          }}
                          onDragEnd={onDragEnd}
                          className={`${course.color} p-1 rounded shadow-sm mb-0.5 cursor-move transition-all hover:shadow-md active:shadow-lg text-xs w-[100px]`}                        
                        >
                          <div className="font-medium text-xs truncate">{course.subject.code}</div>
                          <div className="gap-x-1 text-[10px] leading-tight">
                            <span className="flex flex-wrap">{course.teacher.firstName[0]}.{course.teacher.lastName}</span>
                            <span>{formatGroups(course.groups)}</span>
                            <div className="flex">
                              {course.room && <span>{course.room.code}</span>}
                              <span className="italic ml-2">({course.type})</span>
                            </div>
                            
                          </div>
                        </div>
                      ))}
                    </td>
                  )
                })
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
