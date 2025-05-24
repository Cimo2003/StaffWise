"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SubmitButton2 } from "@/components/submit-button"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { Group, Subject, User } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useData } from "@/app/dashboard/timetable/dataContext"
import { createCourse } from "@/api/courses"
import MultipleSelector from "@/components/ui/multiple-selector"

const FormSchema = z.object({
  type: z.string(),
  semester: z.object({ id: z.number() }),
  subject: z.object({ id: z.any() }),
  teacher: z.object({ id: z.any() }),
  groups: z.array(z.object({ label: z.string(), value: z.string() })),
  color: z.string()
})

const colors = [
  { value: "bg-yellow-300", label: "Yellow" },
  { value: "bg-blue-300", label: "Blue" },
  { value: "bg-green-300", label: "Green" },
  { value: "bg-purple-300", label: "Purple" },
  { value: "bg-red-300", label: "Red" },
  { value: "bg-amber-300", label: "Amber" },
  { value: "bg-blue-400", label: "Dark Blue" },
  { value: "bg-green-400", label: "Dark Green" },
]

type FormValues = z.infer<typeof FormSchema>

export default function AddCourse() {
  const [open, setOpen] = useState(false)
  const { semesterId, subjects, teachers, groups }: { semesterId: number, subjects: Subject[], teachers: User[], groups: Group[] } = useData()
  const groupsOptions = groups.map((g)=>{return{ label: `${g.code} ${g.section.name}`, value: g.id.toString() }})
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      semester: { id: semesterId },
      type: '',
      color: 'bg-yellow-300'
    },
  })

  const onSubmit = async (data: FormValues) => {
    const state = await createCourse({...data, groups: data.groups.map(g=>{return{id: g.value}})})
    if(state.success){
      toast.success("course added successfully")
      setOpen(false)
    }
    else toast.error("failed to add course")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 shadow-lg flex items-center justify-center p-0 z-50 transition-all duration-200 hover:scale-105"
          aria-label="Add Course"
        >
            <Plus className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a Course</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="grid gap-2 mb-4">
            <FormField
                control={form.control}
                name="subject.id"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {
                          subjects.sort((a, b) => a.title.localeCompare(b.title)).map((s:Subject)=>(
                            <SelectItem key={s.id} value={s.id.toString()}>{s.title}</SelectItem>
                          ))
                        }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacher.id"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Professor</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Professor" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {
                          teachers.sort((a, b) => a.fullName.localeCompare(b.fullName)).map((t:User)=>(
                            <SelectItem key={t.id} value={t.id.toString()}>{t.fullName}</SelectItem>
                          ))
                        }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groups"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Groups</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        defaultOptions={groupsOptions}
                        placeholder="Select Groups..."
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </FormControl>                        
                    <FormMessage />
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
                        <SelectItem value="LECTURE">Lecture</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Card Color</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger id="color" className="flex items-center w-full">
                            <div className={`w-4 h-4 rounded mr-2 ${field.value}`}></div>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded mr-2 ${color.value}`}></div>
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
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