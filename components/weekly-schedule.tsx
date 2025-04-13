import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function WeeklySchedule() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold">Weekly Schedule</h2>
        <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                    <SelectTrigger className="font-bold">
                        <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">All Levels</SelectItem>
                        <SelectItem value="dark">L1</SelectItem>
                        <SelectItem value="system">L2</SelectItem>
                    </SelectContent>
                </Select>
          <Button className="hover:bg-schedule-brown/90 text-white text-sm h-9 flex items-center gap-1">
            <Plus size={16} />
            Add Course
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Time</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Monday</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Tuesday</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Wednesday</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Thursday</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Friday</th>
              <th className="border border-[#e5e7eb] p-2 text-left font-medium text-sm">Saturday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#e5e7eb] p-2 text-sm">8:00 AM</td>
              <td className="border border-[#e5e7eb] p-2">
                <div className="bg-pink-100 p-2 rounded">
                  <p className="text-sm font-medium text-pink-600">Mathematics 101</p>
                  <p className="text-xs text-pink-500">Room 204</p>
                </div>
              </td>
              <td className="border border-[#e5e7eb] p-2"></td>
              <td className="border border-[#e5e7eb] p-2">
                <div className="bg-orange-100 p-2 rounded">
                  <p className="text-sm font-medium text-orange-600">Physics Lab</p>
                  <p className="text-xs text-orange-500">Lab 3</p>
                </div>
              </td>
              <td className="border border-[#e5e7eb] p-2"></td>
              <td className="border border-[#e5e7eb] p-2"></td>
              <td className="border border-[#e5e7eb] p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

