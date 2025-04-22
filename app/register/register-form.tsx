"use client"

import { register } from "@/api/users"
import { SubmitButton2 } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { Separator } from "@radix-ui/react-separator"
import { Mail, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const FormSchema = z.object({
  email: z.string().email("please enter a valid email address"),
  firstName: z.string().min(1, "please fill in the first name"),
  lastName: z.string().min(1, "please fill in the last name"),
  password: z.string().min(6, "password needs to be at least 6 characters")
})

type FormValues = z.infer<typeof FormSchema>

export default function RegisterForm(){
  const [visible, setVisible] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: ""
    },
  })

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    console.log(data)
    const state = await register(data)
    if(state.success) toast.success("account created successfully! check your email to verify account.")
    else toast.error("registration failed")
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your first name"
                  className="border-[#ced4da] focus:ring-[#4f46e5]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your last name"
                  className="border-[#ced4da] focus:ring-[#4f46e5]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-[#ced4da] focus:ring-[#4f46e5]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <div className="relative">
                  {visible ? (
                    <EyeOff 
                      onClick={() => setVisible(false)} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af] hover:cursor-pointer"
                    />
                  ) : (
                    <Eye 
                      onClick={() => setVisible(true)} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9ca3af] hover:cursor-pointer" 
                    />
                  )}
                  <Input
                    {...field}
                    type={visible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 border-[#ced4da] focus:ring-[#4f46e5]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <SubmitButton2 form={form} className="w-full bg-[#5c2f32] hover:bg-[#5c2f32]/90 text-white mt-4">
        Sign Up
      </SubmitButton2>

      <div className="relative">
        <Separator className="my-2" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-[#6b7280]">Or continue with</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full border-[#ced4da] bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
          <path
            fill="#EA4335"
            d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
          />
          <path
            fill="#34A853"
            d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
          />
          <path
            fill="#4A90E2"
            d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
          />
        </svg>
        Google
      </Button>

      <div className="text-center text-[#6b7280] text-sm">
        Already have an account?{" "}
        <Link href="login" className="text-[#4f46e5] hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  </Form>
}