import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StaffWisePoster } from "../staffWisePoster"
import { Metadata } from "next"
import RegisterForm from "./register-form"

export const metadata: Metadata = {
  title: "Sign Up"
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center p-4">
      <div className="w-full md:w-[80%] bg-white rounded-xl overflow-hidden flex shadow-lg">
        {/* Left side - Study Programme Poster */}
        <div className="hidden md:block w-[40%] bg-[#f5f0e6]">
          <StaffWisePoster/>
        </div>

        {/* Right side - Sign Up Form */}
        <div className="w-full md:w-[60%] px-4 md:px-12 md:py-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-0 space-y-1">
              <CardTitle className="text-3xl font-bold text-[#111827]">Sign Up</CardTitle>
              <CardDescription className="text-[#6b7280]">Create your account</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RegisterForm/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

