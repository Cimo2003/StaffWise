"use client"

import type React from "react"
import type { Course, Group } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface UnassignedCoursesProps {
  courses: Course[]
  onDragStart: (courseId: number) => void
  onDragEnd: () => void
  onUnassign?: (courseId: number) => void
}

export default function UnassignedCourses({ courses, onDragStart, onDragEnd, onUnassign }: UnassignedCoursesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
    }
    checkScroll()
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll)
      }
      window.removeEventListener("resize", checkScroll)
    }
  }, [courses])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("bg-blue-50")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-blue-50")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-blue-50")

    const courseId = Number.parseInt(e.dataTransfer.getData("text/plain"), 10)
    if (!isNaN(courseId) && onUnassign) {
      onUnassign(courseId)
    }
  }

  const formatGroups = (groups: Group[]) => {
    if (!groups || groups.length === 0) return "No groups"
    if (groups.length === 1) return `${groups[0].code}-${groups[0].section.name}`
    return `${groups[0].section.name}`
  }

  return (
    <div
    className="bg-white rounded-lg shadow transition-colors relative"
    onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {courses.length === 0 ? (
        <div className="text-center text-gray-500 py-3 text-sm h-[120px] flex items-center justify-center">
          <div>
            No unassigned courses. All courses have been scheduled.
            <p className="text-xs mt-1 text-gray-400">Drag a course here to unassign it from the timetable.</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-2 px-6 scrollbar-hide h-[120px] items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-[180px] mx-1">
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", course.id.toString())
                  onDragStart(course.id)
                }}
                onDragEnd={onDragEnd}
                className={`${course.color} p-1 rounded shadow-sm cursor-move transition-all hover:shadow-md active:shadow-lg text-xs h-[80px]`}
              >
                <div className="font-medium text-sm truncate">{course.subject.title}</div>
                <div className="grid gap-x-1 text-[12px] leading-tight">
                  <span>{course.teacher.firstName[0]}.{course.teacher.lastName}</span>
                  <span>{formatGroups(course.groups)}</span>
                  <span className="italic">({course.type})</span>
                </div>
              </div>
            </div>
          ))}
          </div>
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
