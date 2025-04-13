"use client"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"
import { useState, useEffect } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"


export function ProfessorsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-start">
        <div>
          <p className="text-[#6b7280] text-sm">Total Professors</p>
          <h3 className="text-2xl font-bold mt-1">124</h3>

          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f97316] mr-2"></div>
              <span className="text-sm text-[#5b5857]">Female</span>
            </div>
            <div className="flex items-center ml-4">
              <div className="w-3 h-3 rounded-full bg-[#ffd0b0] mr-2"></div>
              <span className="text-sm text-[#5b5857]">Male</span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-[#e5e7eb] rounded-full mt-2 flex overflow-hidden">
            <div className="bg-[#f97316] h-full" style={{ width: "65%" }}></div>
            <div className="bg-[#ffd0b0] h-full" style={{ width: "35%" }}></div>
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-xs text-[#5b5857]">65%</span>
            <span className="text-xs text-[#5b5857]">35%</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-[#fff7ee] rounded-lg flex items-center justify-center">
          <Users color="#5b2e31" size={24}/>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[#6b7280] text-sm">Teaching Distribution</p>
          <p className="text-sm font-medium">100%</p>
        </div>

        <div className="space-y-3">
          <TeachingDistributionItem label="1 Courses" percentage={35} color="#FFD0B0" />
          <TeachingDistributionItem label="2 Courses" percentage={42} color="#F97316" />
          <TeachingDistributionItem label="3 Courses" percentage={15} color="#FF8B3E" />
          <TeachingDistributionItem label="4+ Courses" percentage={8} color="#92400E" />
        </div>
      </div>
    </div>
  )
}

interface TeachingDistributionItemProps {
  label: string
  percentage: number
  color: string
}

function TeachingDistributionItem({ label, percentage, color }: TeachingDistributionItemProps) {
  const [progress, setProgress] = useState(0)
      useEffect(() => {
        const timer = setTimeout(() => setProgress(percentage), 300)
        return () => clearTimeout(timer)
      }, [])
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
          <span className="text-sm text-[#5b5857]">{label}</span>
        </div>
        <span className="text-sm text-[#5b5857]">{progress}%</span>
      </div>
      <Progress value={progress} >
      </Progress>
    </div>
  )
}

