"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { SubmitButton } from "./submit-button"
import { useState } from "react"

interface DeleteSelectedButtonProps {
  selectedRowIds: number[]
  onDelete?: (selectedRowIds: number[]) => Promise<{ success: boolean }>
}

export function DeleteSelectedButton({ selectedRowIds, onDelete }: DeleteSelectedButtonProps) {
  const [ open, setOpen ] = useState(false)
  const handleDelete = async () => {
    if (onDelete) {
      const state = await onDelete(selectedRowIds)
      if(state.success){
        toast.success("Deletion Successful!")
      }
      else toast.error("Deletion Failed.")
    } else {
      console.log("Deleting rows with IDs:", selectedRowIds)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger asChild>
      <Button variant="destructive" size="sm" className="flex items-center gap-1 ml-auto">
          <Trash2 className="h-4 w-4" />
          Delete Selected ({selectedRowIds.length})
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <form action={handleDelete}>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete {selectedRowIds.length} item(s) and remove its data from our
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
