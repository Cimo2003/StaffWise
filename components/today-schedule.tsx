"use client"
import { useState, useEffect } from "react"
import { Progress } from "./ui/progress"

export function TodaySchedule() {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          <ProgressItem label="Standard" percentage={85} />
          <ProgressItem label="Lab" percentage={70} />
          <ProgressItem label="Auditorium" percentage={60} />
        </div>
      </div>
    )
  }
  
  interface ProgressItemProps {
    label: string
    percentage: number
  }
  
  function ProgressItem({ label, percentage }: ProgressItemProps) {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
      const timer = setTimeout(() => setProgress(percentage), 300)
      return () => clearTimeout(timer)
    }, [])
    return (
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-[#5b5857]">{label}</span>
          <span className="text-sm text-[#5b5857]">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    )
  }
  
  