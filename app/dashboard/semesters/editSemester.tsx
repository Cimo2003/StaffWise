"use client"

import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton2 } from "@/components/submit-button"
import { Pencil } from "lucide-react"
import toast from "react-hot-toast"
import { Semester } from "@/lib/types"
import { updateSemester } from "@/api/semesters"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  number: z.any(),
  semesterStart: z.string(),
  semesterEnd: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

export default function EditSemester({ semester, children }: { semester: Semester, children: ReactNode }) {
  const [open, setOpen] = useState(false)
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: semester.id,
      number: semester.number,
      semesterStart: semester.semesterStart,
      semesterEnd: semester.semesterEnd,
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateSemester(data)
    if(state.success){
      toast.success("Semester information updated successfully!")
      setOpen(false)
    }
    else toast.error("Failed to update semester information")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { children } 
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Semester Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid gap-2 mb-4">
            <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Semester Number</FormLabel>
                    <FormControl>
                    <Input type="number" min={1} max={2} className="bg-white w-full" placeholder="Enter Semester Number" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="semesterStart"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="semesterEnd"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            </div>
            <DialogFooter className="sm:justify-end">
              <SubmitButton2 className="w-full" form={form}>
                Update
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}