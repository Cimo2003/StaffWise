"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton2 } from "@/components/submit-button"
import { Import } from "lucide-react"
import toast from "react-hot-toast"
import { FileInput } from "@/components/file-input"
import { importCourses } from "@/api/courses"
import { MyUser } from "@/lib/types"
import { useUser } from "@/hooks/userContext"

// Form validation schema
const FormSchema = z.object({
  file: z.custom<File>()
})

type FormValues = z.infer<typeof FormSchema>

export default function ImportCourses() {
  const [open, setOpen] = useState(false)
  const { faculty_id: id }: MyUser = useUser()
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await importCourses({...data, id})
    if(state.success){
      toast.success("Courses imported successfully")
      setOpen(false)
    }
    else toast.error(state.error)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="text-white flex items-center gap-1 sm:w-auto">
        <Import size={16} />
        Import
      </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Import Courses</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="my-4">
                  <FormLabel>Excel Sheet</FormLabel>
                  <FormControl>
                    <FileInput
                      onChange={(e) => onChange(e.target.files)}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-end">
              <SubmitButton2 className="w-full" form={form}>
                Import
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}