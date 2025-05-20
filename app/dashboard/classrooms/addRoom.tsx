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
import { createRoom } from "@/api/classrooms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form validation schema
const FormSchema = z.object({
  code: z.string(),
  type: z.string(),
  faculty: z.object({ id: z.number() })
})

type FormValues = z.infer<typeof FormSchema>

export default function AddRoom({ id }: { id: number }) {
  const [open, setOpen] = useState(false)

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
      type: '',
      faculty: { id }
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await createRoom(data)
    if(state.success){
      toast.success("room added successfully")
      setOpen(false)
    }
    else toast.error("failed to add room")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="text-white flex items-center gap-1 w-full sm:w-auto">
        <Plus size={16} />
        Add Room
      </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Room</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid grid-cols-2 gap-2 mb-4">
            <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                    <Input className="bg-white w-full" placeholder="Enter Room Code" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Room Type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="STANDARD">Standard</SelectItem>
                        <SelectItem value="LAB">Lab</SelectItem>
                        <SelectItem value="AUDITORIUM">Auditorium</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
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