"use client"
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { exportScheduleToPdf } from "@/lib/pdf-export";
import { Course, Group, MyUser, Room, Semester, Timeslot, User, ViewType } from "@/lib/types";
import { useState } from "react";
import { generatePDF } from "@/lib/pdf-export-2";

interface ExportScheduleProps {
  teacher: MyUser
  courses: Course[]
  timeSlots: string[]
  days: string[]
  semester: Semester
}
interface ExportButtonProps {
  viewType: ViewType
  courses: Course[]
  rooms: Room[]
  teachers: User[]
  groups: Group[]
  timeSlots: Timeslot[]
}

export function ExportButton({
    teacher,
    courses,
    timeSlots,
    days,
    semester
}: ExportScheduleProps){
    const handleExportPdf = () => {
        exportScheduleToPdf({
          teacher,
          courses,
          timeSlots,
          days,
          semester,
        })
      }
    return <Button
      variant="outline" 
      size="sm" 
      onClick={handleExportPdf} 
      className="bg-green-600 hover:bg-green-700 hover:text-white text-white flex items-center gap-1"
    >
      <Download className="h-4 w-4" />
      Export
    </Button>
}

export default function ExportButton2({ viewType, courses, rooms, teachers, groups, timeSlots }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await generatePDF({ viewType, courses, rooms, teachers, groups, timeSlots })
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
      size="sm"
    >
      {isExporting ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <Download size={16} />
          <span>Export</span>
        </>
      )}
    </Button>
  )
}
