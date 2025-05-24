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
import { updateRoom } from "@/api/classrooms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Room } from "@/lib/types"

const FormSchema = z.object({
  id: z.number(),
  code: z.string(),
  type: z.string(),
})

type FormValues = z.infer<typeof FormSchema>

export default function EditRoom({ room }: { room: Room }) {
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: room.id,
      code: room.code,
      type: room.type,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const state = await updateRoom(data)
    if(state.success){
      toast.success("room updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update room")
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
          <DialogTitle className="text-xl">Edit Room</DialogTitle>
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
                Update
              </SubmitButton2>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}