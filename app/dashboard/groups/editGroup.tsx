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
import { Group, Section } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateGroup } from "@/api/groups"
import { useData } from "./dataContext"

// Form validation schema
const FormSchema = z.object({
  id: z.number(),
  code: z.string(),
  section: z.object({ id: z.string() })
})

type FormValues = z.infer<typeof FormSchema>

export default function EditGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(false)
  const sections: Section[] = useData()
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: group.id,
      code: group.code,
      section: { id: group.section.id.toString() }
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    const state = await updateGroup(data)
    if(state.success){
      toast.success("group updated successfully")
      setOpen(false)
    }
    else toast.error("failed to update group")
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
          <DialogTitle className="text-xl">Edit Group</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid gap-2 mb-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input className="bg-white w-full" placeholder="Enter Group Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="section.id"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel>Section</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {
                                    sections.map(s=>(<SelectItem key={s.id} value={s.id.toString()}>
                                        <div>{s.name}</div>
                                        <div>{s.department?.name}</div>
                                    </SelectItem>))
                                }
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