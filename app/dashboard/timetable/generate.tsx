"use client"
import { generate, unassignAll } from "@/api/courses"
import { SubmitButton } from "@/components/submit-button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useData } from "./dataContext"
import { Course } from "@/lib/types"
  
  export function Generate({onGenerate}: {onGenerate: (courses: Course[]) => void}) {
    const [open, setOpen] = useState(false)
    const { semesterId } = useData()
    const handleAssign = async()=>{
      const state = await generate(semesterId)
      if(state.success){
        setOpen(false)
        onGenerate(state.data)
        toast.success("Courses assigned successfully!")
      }
      else toast.error("Assignment failed")
    }
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-400">
            Generate Timetable
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={handleAssign}>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate Timetable</AlertDialogTitle>
            <AlertDialogDescription>
              This action will automatically assign every course to its appropriate room and time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton>
              Generate
            </SubmitButton>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  