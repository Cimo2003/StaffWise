"use client"
import { deleteDepartment } from "@/api/departments"
import { deleteUser } from "@/api/users"
import { SubmitButton } from "@/components/submit-button"
import {
    AlertDialog,
    AlertDialogAction,
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
  
  export function DeleteDepartment({ id }: { id: number }) {
    const [open, setOpen] = useState(false)
    const handleDelete = async()=>{
      const state = await deleteDepartment(id)
      if(state.success){
        setOpen(false)
        toast.success("Department deleted successfully!")
      }
      else toast.error("Deletion failed")
    }
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-400">
            <Trash2 size={16} className="" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={handleDelete}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="mb-4">
              This action cannot be undone. This will permanently delete this department and remove all its related data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton>
              Delete
            </SubmitButton>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  