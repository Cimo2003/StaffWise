import { Faculty, MyUser, Semester } from "@/lib/types";
import EditFaculty from "./editFaculty";
import CreateSemester from "./createSemester";
import EditSemester from "../semesters/editSemester";
import { formatDateWithOrdinal, yearCycle } from "@/lib/date-format";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays, Clock, FileText, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getToken } from "@/api/auth";

export async function FacultyInfo({faculty, semester}:{ faculty: Faculty, semester: Semester }){
    const { role }: MyUser = await getToken()
    return <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6 max-w-lvw">
            <Card className="py-3 animate-fade-left animate-once">
              <CardContent className="p-0">
                <div className="px-4 py-2 flex justify-between items-center animate-fade-left animate-once">
                  <div className="flex items-center gap-2">
                    <FileText className="text-orange-500" size={20} />
                    <h3 className="text-lg font-medium text-orange-500 animate-fade-left animate-once">Faculty Information</h3>
                    {role[0].authority==="ADMIN" && <EditFaculty faculty={faculty} />}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Faculty Name</p>
                    <p className="font-medium">{faculty.name}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Opening Time</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-orange-500" />
                      <p>{faculty.openingTime}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Closing Time</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-orange-500" />
                      <p>{faculty.closingTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="py-3 animate-fade-left animate-once">
              <CardContent className="p-0">
                <div className="px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2 animate-fade-left animate-once">
                    <CalendarDays className="text-blue-500" size={20} />
                    <h3 className="text-lg font-medium text-blue-500">Current Semester</h3>
                    {
                    (semester!=null)
                    && 
                    role[0].authority==="ADMIN" 
                    &&
                    <EditSemester semester={semester} >
                        <Button variant="ghost" size="icon" className="h-8 w-8 animate-fade-left animate-once">
                            <Pencil size={16} className="text-blue-500" />
                        </Button>
                    </EditSemester>
                    }
                  </div>
                </div>
                {
                    semester===null?
                    role[0].authority==="ADMIN" ?
                    <CreateSemester/>
                    :
                    <div>No Semester had been started currently</div>
                    :
                    <div className="p-4">
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Semester</p>
                            <p className="font-medium">{yearCycle(semester)}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Starting Date</p>
                            <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" />
                            <p>{formatDateWithOrdinal(semester.semesterStart)}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Ending Date</p>
                            <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-500" />
                            <p>{formatDateWithOrdinal(semester.semesterEnd)}</p>
                            </div>
                        </div>
                        </div>
                }
                
              </CardContent>
            </Card>
          </div>
    </>
}