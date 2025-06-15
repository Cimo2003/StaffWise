"use client"

import { Button } from "@/components/ui/button"
import type { ViewType } from "@/lib/types"
import AddCourse from "../courses/addCourse"

interface TimetableHeaderProps {
  viewType: ViewType
  setViewType: (viewType: ViewType) => void
  isLoading?: boolean
}

export default function TimetableHeader({
  viewType,
  setViewType,
  isLoading = false,
}: TimetableHeaderProps) {
  return (
      <div className="flex bg-gray-100 rounded-md p-1">
        <Button
          variant={viewType === "room" ? "default" : "ghost"}
          className={viewType === "room" ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => setViewType("room")}
          disabled={isLoading}
        >
          By room
        </Button>
        <Button
          variant={viewType === "teacher" ? "default" : "ghost"}
          className={viewType === "teacher" ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => setViewType("teacher")}
          disabled={isLoading}
        >
          By teacher
        </Button>
        <Button
          variant={viewType === "group" ? "default" : "ghost"}
          className={viewType === "group" ? "bg-amber-500 hover:bg-amber-600" : ""}
          onClick={() => setViewType("group")}
          disabled={isLoading}
        >
          By student group
        </Button>
      </div>
  )
}
