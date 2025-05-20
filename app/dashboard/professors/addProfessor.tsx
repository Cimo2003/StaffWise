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

// Form validation schema
const FormSchema = z.object({
  email: z.string().email("please enter a valid email address"),
  phone: z.string(),
  firstName: z.string().min(1, "please fill in the first name"),
  lastName: z.string().min(1, "please fill in the last name"),
  password: z.string().min(6, "password needs to be at least 6 characters")
})

type FormValues = z.infer<typeof FormSchema>

export default function AddProfessor({ id }: { id: number }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      password: ""
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await register({...data, faculty: { id }, role: "TEACHER"})
    if(state.success){
      toast.success("teacher added successfully")
      setOpen(false)
    }
    else toast.error("failed to add teacher")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="text-white flex items-center gap-1 w-full sm:w-auto">
        <Plus size={16} />
        Add Professor
      </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Professor</DialogTitle>
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
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="+213xxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="minimum: 6 characters" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

            <DialogFooter className="sm:justify-end mx-4">
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