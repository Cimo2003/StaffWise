"use client"

import jsPDF from "jspdf"
import autoTable, { FontStyle } from "jspdf-autotable"
import type { Course, MyUser, Semester, User } from "@/lib/types"
import { yearCycle } from "./date-format"

interface ExportScheduleProps {
  teacher: MyUser
  courses: Course[]
  timeSlots: string[]
  days: string[]
  semester: Semester
}

export function exportScheduleToPdf({
  teacher,
  courses,
  timeSlots,
  days,
  semester,
}: ExportScheduleProps): void {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  // Set document properties
  doc.setProperties({
    title: `Weekly Schedule - ${teacher.full_name}`,
    author: "StaffWise System",
    creator: "StaffWise",
  })

  //  // Add fonts
  //  doc.addFont("helvetica", "normal")
  //  doc.addFont("helvetica", "bold")
 
   // Define colors
   const primaryColor = [64, 81, 181] // Indigo
   const secondaryColor = [233, 30, 99] // Pink
   const accentColor = [0, 150, 136] // Teal
   const lightGray = [240, 240, 240]
   const darkGray = [80, 80, 80]
   const white = [255, 255, 255]
 
   // Page dimensions
   const pageWidth = doc.internal.pageSize.width
   const pageHeight = doc.internal.pageSize.height
   const margin = 14
 
   // Add header background
   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
   doc.rect(0, 0, pageWidth, 40, "F")
 
   // Add header text
   doc.setTextColor(255, 255, 255)
   doc.setFontSize(24)
   doc.setFont("helvetica", "bold")
   doc.text("Weekly Schedule", margin, 20)
   doc.setFontSize(18)
   doc.text(yearCycle(semester), margin + 10, 30)
 
   doc.setFontSize(14)
   doc.setFont("helvetica", "normal")
 
   // Add StaffWise logo/text
   doc.setFontSize(16)
   doc.setFont("helvetica", "bold")
   doc.addImage('/icon.png', 'PNG', pageWidth - margin - 30, 10, 23, 20);
 
   // Add teacher info section background
   doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
   doc.rect(0, 40, pageWidth, 15, "F")

  // Add teacher info
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Teacher:", margin, 49)
  doc.text("Email:", margin + 80, 49)

  doc.setFont("helvetica", "normal")
  doc.text(teacher.full_name, margin + 25, 49)
  doc.text(teacher.sub, margin + 80 + 15 , 49)

  // Define colors for different course types - cast as tuples
  const courseColors = {
    blue: [210, 230, 255] as [number, number, number],
    purple: [230, 210, 255] as [number, number, number],
    emerald: [210, 250, 230] as [number, number, number],
    orange: [255, 230, 210] as [number, number, number],
    slate: [230, 230, 240] as [number, number, number],
  }

  // Prepare the table data
  const tableHead = ["", ...timeSlots]

  // Create a 2D array to represent the schedule grid
  const scheduleGrid: (string | null)[][] = days.map((day) => {
    const row: (string | null)[] = [day]

    // Add empty cells for each day
    timeSlots.forEach(() => {
      row.push(null)
    })

    return row
  })

  // Fill in the schedule grid with course information
  courses.forEach((course) => {
    if (!course.timeslot) return

    const dayIndex = days.findIndex((day) => day === course.timeslot?.day)

    const timeIndex = timeSlots.findIndex(
      (timeSlot) => timeSlot === `${course.timeslot?.fromTime} - ${course.timeslot?.toTime}`,
    )

    if (dayIndex !== -1 && timeIndex !== -1) {
      // Create a formatted string for the course
      const groupCodes = course.groups.map((g) => g.code).join(", ")
      const courseInfo = [
        course.subject.title,
        course.room ? `Room: ${course.room.code}` : "No Room",
        groupCodes ? `Group: ${groupCodes}` : "",
      ]
        .filter(Boolean)
        .join("\n")

      // Add the course info to the grid (day is row, time is column)
      scheduleGrid[dayIndex][timeIndex + 1] = courseInfo
    }
  })

  // Define cell styles based on course colors
  const getCellStyle = (rowIndex: number, colIndex: number) => {
    if (colIndex === 0) return {} // Day column has no special styling

    const day = days[rowIndex]
    const timeSlot = timeSlots[colIndex - 1]

    // Find a course for this cell
    const course = courses.find(
      (c) => c.timeslot?.day === day && `${c.timeslot.fromTime} - ${c.timeslot.toTime}` === timeSlot,
    )

    if (!course) return {}

    // Return the appropriate background color
    const colorKey = (course.color as keyof typeof courseColors) || "slate"
    return {
      fillColor: courseColors[colorKey] || white,
      textColor: [0, 0, 0],
      fontStyle: "normal",
    }
  }

  // Generate the table
  autoTable(doc, {
    head: [tableHead],
    body: scheduleGrid,
    startY: 70,
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: accentColor as [number, number, number],
      textColor: white as [number, number, number],
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: {
        // Style for the first column (days)
        fontStyle: "bold",
        fillColor: [220, 220, 240],
        textColor: darkGray as [number, number, number],
        cellWidth: 30,
        halign: "center",
      },
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    willDrawCell: (data) => {
      // Apply custom styling to cells
      if (data.section === "body" && data.row.index !== undefined && data.column.index > 0) {
        const style = getCellStyle(data.row.index, data.column.index)
        if (style.fillColor) {
          data.cell.styles.fillColor = style.fillColor
        }
        if (style.textColor) {
          data.cell.styles.textColor = style.textColor as [number, number, number]
        }
        if (style.fontStyle) {
          data.cell.styles.fontStyle = style.fontStyle as FontStyle
        }
      }
    },
    didDrawPage: (data) => {
      // Add footer
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
      doc.rect(0, pageHeight - 15, pageWidth, 15, "F")

      doc.setFontSize(8)
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.text(`Page ${data.pageNumber} of ${doc.getNumberOfPages()}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      })

      doc.text("StaffWise Schedule Management System", margin, pageHeight - 10)
      doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth - margin, pageHeight - 10, { align: "right" })
    },
  })


  // Save the PDF
  doc.save(`schedule_${teacher.full_name}.pdf`)
}
