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
import { createRoom } from "@/api/classrooms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSubject, updateSubject } from "@/api/subjects"
import { Subject } from "@/lib/types"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  code: z.string(),
  title: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

export default function EditSubject({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: subject.id,
      code: subject.code,
      title: subject.title,
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateSubject(data)
    if(state.success){
      toast.success("subject updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update subject")
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
          <DialogTitle className="text-xl">Edit Subject</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid grid-cols-2 gap-2 mb-4">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" placeholder="Enter Subject Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" placeholder="Enter Subject Code" {...field} />
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