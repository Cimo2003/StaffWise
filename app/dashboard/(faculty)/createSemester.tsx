"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton2 } from "@/components/submit-button"
import { Pencil, Sparkles } from "lucide-react"
import toast from "react-hot-toast"
import { Faculty, MyUser } from "@/lib/types"
import { updateFaculty } from "@/api/faculty"
import { useUser } from "@/hooks/userContext"
import { createSemester } from "@/api/semesters"

// Form validation schema
const FormSchema = z.object({
  number: z.any(),
  semesterStart: z.string(),
  semesterEnd: z.string(),
  faculty: z.object({ id: z.number() })
})

type FormValues = z.infer<typeof FormSchema>

export default function CreateSemester() {
  const [open, setOpen] = useState(false)
  const user: MyUser = useUser()
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      number: 1,
      semesterStart: "",
      semesterEnd: "",
      faculty: { id: user.faculty_id }
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await createSemester(data)
    if(state.success){
      toast.success("New semester created successfully!")
      setOpen(false)
    }
    else toast.error("failed to create a new semester")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="animate-fade-left animate-once">
            <Sparkles />
            Start New Semester
        </Button>    
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a New Semester</DialogTitle>
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
                Submit
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}