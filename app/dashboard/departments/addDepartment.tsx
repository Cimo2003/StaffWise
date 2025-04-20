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
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { register } from "@/api/users"
import { createDepartment } from "@/api/departments"

// Form validation schema
const FormSchema = z.object({
  name: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

export default function AddDepartment({ id }: { id: number }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await createDepartment({...data, faculty: { id }})
    if(state.success){
      toast.success("department added successfully")
      setOpen(false)
    }
    else toast.error("failed to add department")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="text-white flex items-center gap-1 w-full sm:w-auto">
        <Plus size={16} />
        Add Department
      </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Department</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter Department Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
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