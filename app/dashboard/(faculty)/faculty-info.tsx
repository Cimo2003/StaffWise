import { Faculty, Semester } from "@/lib/types";
import EditFaculty from "./editFaculty";
import CreateSemester from "./createSemester";
import EditSemester from "../semesters/editSemester";
import { formatDateWithOrdinal, yearCycle } from "@/lib/date-format";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export function FacultyInfo({faculty, semester}:{ faculty: Faculty, semester: Semester }){
    return <>
    <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-3">
        <div className="flex ">
            <h2 className="text-lg font-semibold mb-4 mr-2 animate-fade-left animate-once bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Faculty Information</h2>
            <EditFaculty faculty={faculty} />
        </div>
        <div className="flex p-1 animate-fade-left animate-once">
            <span className="font-semibold mr-2">Faculty Name:</span>
            <span className="text-gray-700">{faculty.name}</span>
        </div>
        <div className="flex p-1 animate-fade-left animate-once">
            <span className="font-semibold mr-2">Opening Time: </span>
            <span className="text-gray-700">{faculty.openingTime}</span>
        </div>
        <div className="flex p-1 animate-fade-left animate-once">
            <span className="font-semibold mr-2">Closing Time: </span>
            <span className="text-gray-700">{faculty.closingTime}</span>
        </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
        <div className="flex ">
            <h2 className="text-lg font-semibold mb-4 mr-2 animate-fade-left animate-once bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Current Semester</h2>
            { 
            (semester!=null) 
            && 
            <EditSemester semester={semester} >
                <Button variant="ghost" size="icon" className="h-8 w-8 animate-fade-left animate-once">
                    <Pencil size={16} className="text-orange-500" />
                </Button>
            </EditSemester> 
            }
        </div>
        {
            semester===null?
            <CreateSemester/>
            :
            <>
            <div className="flex p-1 animate-fade-left animate-once">
                <span className="font-semibold mr-2">Semester: </span>
                <span className="text-gray-700">{yearCycle(semester)}</span>
            </div>
            <div className="flex p-1 animate-fade-left animate-once">
                <span className="font-semibold mr-2">Starting Date: </span>
                <span className="text-gray-700">{formatDateWithOrdinal(semester.semesterStart)}</span>
            </div>
            <div className="flex p-1 animate-fade-left animate-once">
                <span className="font-semibold mr-2">Ending Date: </span>
                <span className="text-gray-700">{formatDateWithOrdinal(semester.semesterEnd)}</span>
            </div>
        </>
        }
        
    </div>
    </>
}