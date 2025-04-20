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
import { Pencil, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { register } from "@/api/users"
import { createDepartment, updateDepartment } from "@/api/departments"
import { Department } from "@/lib/types"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  name: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

export default function EditDepartment({ department }: { department: Department }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: department.id,
      name: department.name
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateDepartment(data)
    if(state.success){
      toast.success("department updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update department")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil size={16} className="text-gray-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Department</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                Update
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}