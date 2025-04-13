"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton2 } from "@/components/submit-button"
import { Plus } from "lucide-react"

// Form validation schema
const schoolFormSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string()
})

type SchoolFormValues = z.infer<typeof schoolFormSchema>

export default function AddProfessor({ id }: { id: number }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: ""
    },
  })

  // Form submission handler
  const onSubmit = async (data: SchoolFormValues) => {

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
              <div className="grid grid-cols-1 gap-4 py-4 mx-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter your first name" {...field} />
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
                        <Input className="bg-white w-full" placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter Email Address" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

            <DialogFooter className="sm:justify-end">
              <SubmitButton2 form={form}>
                Submit
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}