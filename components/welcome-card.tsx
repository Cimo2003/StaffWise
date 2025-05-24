import { countTeacherCoursesForToday } from "@/api/courses"
import { Card, CardContent } from "@/components/ui/card"
import { MyUser } from "@/lib/types"
import Link from "next/link"

export default async function WelcomeCard({user}:{user: MyUser}) {
  const countCourses = await countTeacherCoursesForToday(user.user_id)
  return (
    <Card className="mb-6 border-none bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between animate-fade-up animate-once">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Dr. {user.full_name}</h2>
            <p className="mt-1 text-orange-100">You have {countCourses} classes scheduled for today</p>
          </div>
          {user.role.find(r=>r.authority==="TEACHER")!==undefined
          &&
          <Link href="#schedule" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-9 px-4 py-2 has-[>svg]:px-3 mt-4 bg-white text-orange-600 hover:bg-orange-50 md:mt-0">View Schedule</Link>
          }
          {user.role.find(r=>r.authority==="ADMIN")!==undefined
          &&
          <Link href="/dashboard/timetable" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md h-9 px-4 py-2 has-[>svg]:px-3 mt-4 bg-white text-orange-600 hover:bg-orange-50 md:mt-0">View Timetable</Link>
          }
        </div>
      </CardContent>
    </Card>
  )
}
