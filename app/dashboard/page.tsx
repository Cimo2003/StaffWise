import { getToken } from "@/api/auth";
import { createFaculty, getUserFaculty } from "@/api/faculty";
import { StatsCards } from "@/components/stats-cards";
import { SubmitButton } from "@/components/submit-button";
import { TodaySchedule } from "@/components/today-schedule";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WeeklySchedule } from "@/components/weekly-schedule";
import { Faculty, Semester } from "@/lib/types";
import { FacultyInfo } from "./(faculty)/faculty-info";
import { getCurrentSemester } from "@/api/semesters";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
  }

export default async function Page() {
    const { user_id } = await getToken()
    const faculty: Faculty = await getUserFaculty(user_id)
    const currentSemester: Semester = await getCurrentSemester(faculty.id)
    return <>
        {
            faculty?
            <>
            <StatsCards facultyId={faculty.id} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4 ">
                <FacultyInfo faculty={faculty} semester={currentSemester} />
                <div className="lg:col-span-5">
                    <TodaySchedule />
                </div>
            </div>
            <WeeklySchedule />
            </>
            :
            <div className="bg-white rounded-lg shadow-sm p-4">
                <h1 className="text-2xl font-bold mb-4 flex animate-fade-left animate-once">Welcome to <div className="ml-2 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">StaffWise!</div></h1>
                <h1 className="text-lg mb-4 text-gray-600 animate-fade-left animate-once">Start by entering your Faculty information:</h1>
                <form action={createFaculty}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="first-name">Faculty Name</Label>
                            <Input
                            name="name"
                            placeholder="Enter your faculty's name"
                            className="border-[#ced4da] focus:ring-[#4f46e5]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="openingTime">Opening Time</Label>
                            <Input
                                name="openingTime"
                                type="time"
                                placeholder="Enter your email"
                                className="pl-10 border-[#ced4da] focus:ring-[#4f46e5]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="closingTime">Closing Time</Label>
                            <Input
                                name="closingTime"
                                type="time"
                                placeholder="Enter your password"
                                className="pl-10 border-[#ced4da] focus:ring-[#4f46e5]"
                            />
                        </div>
                        <input type="hidden" name="userId" value={user_id} />
                        <SubmitButton className="col-span-2 w-full bg-[#5c2f32] hover:bg-[#5c2f32]/90 text-white mt-4">
                            Create Faculty
                        </SubmitButton>
                    </div>
                </form>
            </div>
        }
    </>
}