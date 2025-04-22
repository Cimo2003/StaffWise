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
import { Pencil } from "lucide-react"
import toast from "react-hot-toast"
import { Faculty } from "@/lib/types"
import { updateFaculty } from "@/api/faculty"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  name: z.string(),
  openingTime: z.string(),
  closingTime: z.string()
})

type FormValues = z.infer<typeof FormSchema>

export default function EditSubject({ faculty }: { faculty: Faculty }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: faculty.id,
      name: faculty.name,
      openingTime: faculty.openingTime,
      closingTime: faculty.closingTime,
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateFaculty(data)
    if(state.success){
      toast.success("faculty information updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update faculty information")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 animate-fade-left animate-once">
          <Pencil size={16} className="text-orange-500" />
        </Button>        
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Faculty Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid gap-2 mb-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Faculty Name</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" placeholder="Enter Faculty Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="openingTime"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Opening Time</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" type="time" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="closingTime"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Closing Time</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" type="time" {...field} />
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