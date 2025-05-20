import type { Course } from "@/lib/types"

interface ScheduleData {
  timeSlots: string[]
  days: string[]
  courses: Course[]
}

interface ScheduleGridProps {
  scheduleData: ScheduleData
}

export default function ScheduleGrid({ scheduleData }: ScheduleGridProps) {
  const { timeSlots, days, courses } = scheduleData

  // Function to find courses for a specific day and time slot
  const findCourses = (day: string, timeSlot: string) => {
    // Parse the time slot to get start and end times
    const [startTime, endTime] = timeSlot.split(" - ")

    return courses.filter((course) => {
      if (!course.timeslot) return false

      return course.timeslot.day === day && course.timeslot.fromTime === startTime && course.timeslot.toTime === endTime
    })
  }

  return (
    <div className="min-w-[1000px]">
      {/* Schedule Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        <div className="p-2 text-center font-medium text-slate-500">Time</div>
        {days.map((day, index) => (
          <div key={index} className="p-2 text-center font-medium text-slate-800">
            {day}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-2">
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeIndex} className="grid grid-cols-7 gap-2">
            <div className="p-2 text-center text-sm font-medium text-slate-500">{timeSlot}</div>
            {days.map((day, dayIndex) => {
              const coursesForSlot = findCourses(day, timeSlot)
              return (
                <div key={dayIndex} className="bg-slate-50 rounded-md p-2">
                  {coursesForSlot.length > 0
                    ? coursesForSlot.map((course) => <CourseSlot key={course.id} course={course} />)
                    : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function CourseSlot({ course }: { course: Course }) {
  const { subject, timeslot, room, groups, color } = course

  const getBgColor = () => {
    if (!color) return "bg-slate-50 border-slate-200"

    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-100"
      case "purple":
        return "bg-purple-50 border-purple-100"
      case "emerald":
        return "bg-emerald-50 border-emerald-100"
      case "orange":
        return "bg-orange-50 border-orange-100"
      case "slate":
        return "bg-slate-50 border-slate-200"
      default:
        return "bg-slate-50 border-slate-200"
    }
  }

  const getTextColor = () => {
    if (!color) return "text-slate-600"

    switch (color) {
      case "blue":
        return "text-blue-600"
      case "purple":
        return "text-purple-600"
      case "emerald":
        return "text-emerald-600"
      case "orange":
        return "text-orange-600"
      case "slate":
        return "text-slate-600"
      default:
        return "text-slate-600"
    }
  }

  if (!timeslot) return null

  return (
    <div className={`${getBgColor()} shadow-sm border rounded-md p-2 -m-2`}>
      <div className={`text-xs font-medium ${getTextColor()}`}>
        {timeslot.fromTime} - {timeslot.toTime}
      </div>
      <div className="text-sm font-medium text-slate-800">{subject.title}</div>
      <div className="text-xs text-slate-600 mt-1">{room ? room.code : "No Room Assigned"}</div>
      {groups.length > 0 && (
        <div className="text-xs text-slate-600">
          {groups[0].code} {groups.length > 1 ? `+${groups.length - 1} more` : ""}
        </div>
      )}
    </div>
  )
}
