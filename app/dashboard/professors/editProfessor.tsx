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
import { updateUser } from "@/api/users"
import { User } from "@/lib/types"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  phone: z.string(),
  firstName: z.string().min(1, "please fill in the first name"),
  lastName: z.string().min(1, "please fill in the last name"),
})

type FormValues = z.infer<typeof FormSchema>

export default function EditProfessor({ teacher }: { teacher: User }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: teacher.id,
      phone: teacher.phone,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateUser(data)
    if(state.success){
      toast.success("teacher information updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update teacher information")
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
          <DialogTitle className="text-xl">Edit Professor Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mt-4 mb-8 mx-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="+213xxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

            <DialogFooter className="sm:justify-end mx-4">
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