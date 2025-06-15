"use client"
import { unassignAll } from "@/api/courses"
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
  
  export function UnassignAll({onUnassign}: {onUnassign: (courses: Course[]) => void}) {
    const [open, setOpen] = useState(false)
    const { semesterId } = useData()
    const handleUnassign = async()=>{
      const state = await unassignAll(semesterId)
      if(state.success){
        setOpen(false)
        onUnassign(state.data)
        toast.success("Courses unassigned successfully!")
      }
      else toast.error("Unassignment failed")
    }
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-400">
            Unassign All
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={handleUnassign}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will unassign all courses in this semester.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton>
              Unassign
            </SubmitButton>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  