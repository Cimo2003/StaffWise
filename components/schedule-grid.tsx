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
    <div className="max-w-vw">
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
            <div className="grid place-items-center p-2 text-center text-sm font-medium text-slate-500">{timeSlot}</div>
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
      case "bg-blue-300":
        return "bg-blue-50 border-blue-100"
      case "bg-blue-400":
        return "bg-blue-100 border-blue-200"
      case "bg-purple-300":
        return "bg-purple-50 border-purple-100"
      case "bg-emerald-300":
        return "bg-emerald-50 border-emerald-100"
      case "bg-orange-300":
        return "bg-orange-50 border-orange-100"
      case "bg-yellow-300":
        return "bg-yellow-50 border-yellow-200"
      case "bg-green-300":
        return "bg-green-50 border-green-200"
      case "bg-green-400":
        return "bg-green-100 border-green-300"
      case "bg-red-300":
        return "bg-red-50 border-red-200"
      case "bg-amber-300":
        return "bg-amber-50 border-amber-200"
      default:
        return "bg-slate-50 border-slate-200"
    }
  }

  const getTextColor = () => {
    if (!color) return "text-slate-600"

    switch (color) {
      case "bg-blue-300":
        return "text-blue-600"
      case "bg-blue-400":
        return "text-blue-700"
      case "bg-purple-300":
        return "text-purple-600"
      case "bg-emerald-300":
        return "text-emerald-600"
      case "bg-orange-300":
        return "text-orange-600"
      case "bg-yellow-300":
        return "text-yellow-600"
      case "bg-green-300":
        return "text-green-600"
      case "bg-green-400":
        return "text-green-700"
      case "bg-red-300":
        return "text-red-600"
      case "bg-amber-300":
        return "text-amber-600"
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
