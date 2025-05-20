"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ScheduleGrid from "@/components/schedule-grid"
import type { Course, Group, Room, Section, Semester, Subject, Timeslot, User } from "@/lib/types"

export default function WeeklySchedule() {
  const [currentWeek, setCurrentWeek] = useState("May 19 - May 25, 2025")

  // Sample data using the updated interfaces
  const teacher: User = {
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    fullName: "Dr. Jane Doe",
    email: "jane.doe@university.edu",
    phone: "+1-555-123-4567",
    isEnabled: true,
  }

  const semester: Semester = {
    id: 1,
    number: 2,
    semesterStart: "2025-01-25",
    semesterEnd: "2025-06-19",
  }

  const sections: Section[] = [
    { id: 1, name: "ISIL", level: "L3"},
    { id: 2, name: "SI", level: "L3" },
  ]

  const subjects: Subject[] = [
    { id: 1, code: "CS-101", title: "Introduction to Programming" },
    { id: 2, code: "CS-201", title: "Data Structures" },
    { id: 3, code: "CS-301", title: "Advanced Algorithms" },
    { id: 4, code: "CS-205", title: "Database Systems" },
    { id: 5, code: "CS-400", title: "Research Seminar" },
    { id: 6, code: "CS-SPEC", title: "Weekend Workshop" },
    { id: 7, code: "CS-ONL", title: "Online Lecture" },
    { id: 100, code: "ADMIN", title: "Faculty Meeting" },
    { id: 101, code: "OFFICE", title: "Office Hours" },
    { id: 102, code: "RESEARCH", title: "Research Meeting" },
  ]

  const groups: Group[] = [
    { id: 1, code: "CS-101", section: sections[0] },
    { id: 2, code: "CS-201", section: sections[1] },
    { id: 3, code: "CS-301", section: sections[1] },
    { id: 4, code: "CS-205", section: sections[0] },
    { id: 5, code: "CS-400", section: sections[1] },
    { id: 6, code: "CS-SPEC", section: sections[1] },
    { id: 7, code: "CS-ONL", section: sections[0] },
  ]

  const rooms: Room[] = [
    { id: 1, code: "R101", type: "Classroom" },
    { id: 2, code: "L3", type: "Laboratory" },
    { id: 3, code: "AUD", type: "Lecture Hall" },
    { id: 4, code: "R202", type: "Classroom" },
    { id: 5, code: "R305", type: "Classroom" },
    { id: 6, code: "L5", type: "Laboratory" },
    { id: 7, code: "CONF", type: "Meeting Room" },
    { id: 8, code: "O302", type: "Office" },
    { id: 9, code: "VIRTUAL", type: "Online" },
  ]

  const timeslots: Timeslot[] = [
    { id: 1, day: "Monday", fromTime: "08:00", toTime: "09:30" },
    { id: 2, day: "Wednesday", fromTime: "08:00", toTime: "09:30" },
    { id: 3, day: "Tuesday", fromTime: "09:30", toTime: "11:00" },
    { id: 4, day: "Thursday", fromTime: "09:30", toTime: "11:00" },
    { id: 5, day: "Tuesday", fromTime: "11:00", toTime: "12:30" },
    { id: 6, day: "Thursday", fromTime: "11:00", toTime: "12:30" },
    { id: 7, day: "Monday", fromTime: "12:30", toTime: "14:00" },
    { id: 8, day: "Monday", fromTime: "14:00", toTime: "15:30" },
    { id: 9, day: "Wednesday", fromTime: "14:00", toTime: "15:30" },
    { id: 10, day: "Tuesday", fromTime: "15:30", toTime: "17:00" },
    { id: 11, day: "Thursday", fromTime: "15:30", toTime: "17:00" },
    { id: 12, day: "Saturday", fromTime: "09:30", toTime: "11:00" },
    { id: 13, day: "Saturday", fromTime: "14:00", toTime: "15:30" },
    { id: 14, day: "Sunday", fromTime: "11:00", toTime: "12:30" },
    { id: 15, day: "Wednesday", fromTime: "09:30", toTime: "11:00" },
  ]

  const courses: Course[] = [
    {
      id: 1,
      subject: subjects[0],
      teacher: teacher,
      semester: semester,
      groups: [groups[0]],
      type: "Lecture",
      color: "blue",
      timeslot: timeslots[0],
      room: rooms[0],
    },
    {
      id: 2,
      subject: subjects[0],
      teacher: teacher,
      semester: semester,
      groups: [groups[0]],
      type: "Lecture",
      color: "blue",
      timeslot: timeslots[1],
      room: rooms[0],
    },
    {
      id: 3,
      subject: subjects[1],
      teacher: teacher,
      semester: semester,
      groups: [groups[1]],
      type: "Lecture",
      color: "purple",
      timeslot: timeslots[4],
      room: rooms[1],
    },
    {
      id: 4,
      subject: subjects[1],
      teacher: teacher,
      semester: semester,
      groups: [groups[1]],
      type: "Lecture",
      color: "purple",
      timeslot: timeslots[5],
      room: rooms[1],
    },
    {
      id: 5,
      subject: subjects[2],
      teacher: teacher,
      semester: semester,
      groups: [groups[2]],
      type: "Lecture",
      color: "emerald",
      timeslot: timeslots[7],
      room: rooms[2],
    },
    {
      id: 6,
      subject: subjects[2],
      teacher: teacher,
      semester: semester,
      groups: [groups[2]],
      type: "Lecture",
      color: "emerald",
      timeslot: timeslots[8],
      room: rooms[2],
    },
    {
      id: 7,
      subject: subjects[7],
      teacher: teacher,
      semester: semester,
      groups: [],
      type: "Meeting",
      color: "orange",
      timeslot: timeslots[9],
      room: rooms[6],
    },
    {
      id: 8,
      subject: subjects[8],
      teacher: teacher,
      semester: semester,
      groups: [],
      type: "Office Hours",
      color: "slate",
      timeslot: timeslots[6],
      room: rooms[7],
    },
    {
      id: 9,
      subject: subjects[8],
      teacher: teacher,
      semester: semester,
      groups: [],
      type: "Office Hours",
      color: "slate",
      timeslot: timeslots[14],
      room: rooms[7],
    },
    {
      id: 10,
      subject: subjects[3],
      teacher: teacher,
      semester: semester,
      groups: [groups[3]],
      type: "Lecture",
      color: "blue",
      timeslot: timeslots[2],
      room: rooms[3],
    },
    {
      id: 11,
      subject: subjects[3],
      teacher: teacher,
      semester: semester,
      groups: [groups[3]],
      type: "Lecture",
      color: "blue",
      timeslot: timeslots[3],
      room: rooms[3],
    },
    {
      id: 12,
      subject: subjects[4],
      teacher: teacher,
      semester: semester,
      groups: [groups[4]],
      type: "Seminar",
      color: "purple",
      timeslot: timeslots[10],
      room: rooms[4],
    },
    {
      id: 13,
      subject: subjects[5],
      teacher: teacher,
      semester: semester,
      groups: [groups[5]],
      type: "Workshop",
      color: "orange",
      timeslot: timeslots[11],
      room: rooms[5],
    },
    {
      id: 14,
      subject: subjects[9],
      teacher: teacher,
      semester: semester,
      groups: [],
      type: "Meeting",
      color: "emerald",
      timeslot: timeslots[12],
      room: rooms[6],
    },
    {
      id: 15,
      subject: subjects[6],
      teacher: teacher,
      semester: semester,
      groups: [groups[6]],
      type: "Online",
      color: "blue",
      timeslot: timeslots[13],
      room: rooms[8],
    },
  ]

  const scheduleData = {
    timeSlots: ["08:00 - 09:30", "09:30 - 11:00", "11:00 - 12:30", "12:30 - 14:00", "14:00 - 15:30", "15:30 - 17:00"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
    courses: courses,
  }

  // Create legend items from unique subjects
  const uniqueSubjects = Array.from(new Set(courses.map((course) => course.subject.title))).map((title) => {
    const course = courses.find((c) => c.subject.title === title)
    return {
      name: title,
      color: course?.color || "slate",
    }
  })

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-100 p-1.5">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-medium">Weekly Schedule</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentWeek}</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 overflow-auto">
        <ScheduleGrid scheduleData={scheduleData} />
      </CardContent>
      <CardFooter className="border-t bg-slate-50 px-6 py-3">
        <ScheduleLegend legend={uniqueSubjects} />
      </CardFooter>
    </Card>
  )
}

interface LegendItem {
  name: string
  color: string
}

function ScheduleLegend({ legend }: { legend: LegendItem[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {legend.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <div className={`h-3 w-3 rounded-full bg-${item.color}-500`}></div>
          <span className="text-xs text-slate-600">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
