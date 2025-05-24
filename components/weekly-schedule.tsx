import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScheduleGrid from "@/components/schedule-grid"
import type { Course, MyUser, Semester } from "@/lib/types"
import { getTeacherSchedule } from "@/api/courses"
import { ExportButton } from "./export-button"

export default async function WeeklySchedule({ user, semester }: { user: MyUser, semester: Semester }) {

  const courses: Course[] = await getTeacherSchedule(user.user_id, semester.id)

  const scheduleData = {
    timeSlots: ["08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", "14:00 - 15:30", "15:30 - 17:00"],
    days: ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"],
    courses: courses,
  }

  return (
    <Card id="schedule" className="border-none shadow-md max-w-lvw">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-100 p-1.5">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-medium">Weekly Schedule</CardTitle>
          </div>
          <ExportButton 
            teacher={user}
            courses={courses}
            timeSlots={scheduleData.timeSlots}
            days={scheduleData.days}
            semester={semester}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4 overflow-auto max-w-lvw">
        <ScheduleGrid scheduleData={scheduleData} />
      </CardContent>
    </Card>
  )
}