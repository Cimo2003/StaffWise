import type { Course, ViewType, Room, User, Group, Timeslot } from "./types"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Need to extend the jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

interface GeneratePDFProps {
  viewType: ViewType
  courses: Course[]
  rooms: Room[]
  teachers: User[]
  groups: Group[]
  timeSlots: Timeslot[]
}

export async function generatePDF({ viewType, courses, rooms, teachers, groups, timeSlots }: GeneratePDFProps) {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  // Group timeslots by day
  const timeSlotsByDay: Record<string, Timeslot[]> = {}
  timeSlots.forEach((slot) => {
    if (!timeSlotsByDay[slot.day]) {
      timeSlotsByDay[slot.day] = []
    }
    timeSlotsByDay[slot.day].push(slot)
  })

  // Get unique days
  const days = Object.keys(timeSlotsByDay)

  // Get the rows based on view type
  const rows = viewType === "room" ? rooms : viewType === "teacher" ? teachers : groups

  // Get unique time slots
  const uniqueTimes = Array.from(
    new Set(
      timeSlots.map((slot) => {
        return `${slot.fromTime}-${slot.toTime}`
      }),
    ),
  ).sort()

  // Format groups for display
  const formatGroups = (groups: Group[]) => {
    if (!groups || groups.length === 0) return "No groups"
    return groups.map((g) => g.code).join(", ")
  }

  // Get the name of the row based on view type
  const getRowName = (row: Room | User | Group) => {
    if (viewType === "room") return (row as Room).code
    if (viewType === "teacher") return (row as User).fullName
    return `${(row as Group).code}-${(row as Group).section.name}`
  }

  // Generate a page for each row
  rows.forEach((row, index) => {
    // Add a new page for each row except the first one
    if (index > 0) {
      doc.addPage()
    }

    // Add title
    const rowName = getRowName(row)
    const title = `${viewType === "room" ? "Room" : viewType === "teacher" ? "Teacher" : "Group"} Schedule: ${rowName}`
    doc.setFontSize(16)
    doc.text(title, 14, 15)

    // Add date
    const today = new Date().toLocaleDateString()
    doc.setFontSize(10)
    doc.text(`Generated on: ${today}`, 14, 22)

    // Prepare table headers
    const headers = [["", ...uniqueTimes]]

    // Prepare table data - days as rows
    const data = days.map((day) => {
      const rowData = [day.toUpperCase()]
      // For each time slot, find the courses on this day
      uniqueTimes.forEach((time) => {
        const dayTimeSlots = timeSlotsByDay[day].filter((slot) => `${slot.fromTime}-${slot.toTime}` === time)
        if (dayTimeSlots.length === 0) {
          rowData.push("")
          return
        }

        const timeslot = dayTimeSlots[0]
        const cellCourses = courses.filter((course) => {
          if (!course.timeslot || course.timeslot.id !== timeslot.id) {
            return false
          }

          switch (viewType) {
            case "room":
              return course.room?.id === row.id
            case "teacher":
              return course.teacher.id === row.id
            case "group":
              return course.groups.some((group) => group.id === row.id)
            default:
              return false
          }
        })

        if (cellCourses.length === 0) {
          rowData.push("")
          return
        }

        // Format the courses for this cell
        const cellContent = cellCourses
          .map((course) => {
            let content = `${course.subject.title}\n`

            if (viewType !== "teacher") {
              content += `Teacher: ${course.teacher.lastName}\n`            }

            if (viewType !== "group") {
              content += `Group: ${formatGroups(course.groups)}`
            }

            if (viewType !== "room" && course.room) {
              content += `Room: ${course.room.code}`
            }

            return content
          })
          .join("\n\n")

        rowData.push(cellContent)
      })

      return rowData
    })

    // Generate the table using autoTable
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 25,
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 4,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        halign: "left",
        valign: "top",
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [0, 150, 136], // Teal color for time headers
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: {
          fillColor: [220, 220, 240], // Light purple for day column
          fontStyle: "bold",
          cellWidth: 30,
          halign: "center",
          valign: "middle",
        },
      },
      didParseCell: (data) => {
        // Style the day cells (first column)
        if (data.column.index === 0 && data.row.index >= 0) {
          data.cell.styles.fillColor = [220, 220, 240] // Light purple
          data.cell.styles.fontStyle = "bold"
          data.cell.styles.halign = "center"
          data.cell.styles.valign = "middle"
        }
      },
    })
  })

  // Get the filename based on view type
  const filename = `timetable_by_${viewType}_${new Date().toISOString().split("T")[0]}.pdf`

  // Save the PDF
  doc.save(filename)
}