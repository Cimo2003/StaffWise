'use client'
 
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { ReactNode } from 'react'
import { Spinner } from './spinner'
 
export function SubmitButton({className, children}: { className?: string , children: ReactNode}) {
  const { pending } = useFormStatus()
 
  return (
    <Button className={`${className}`} disabled={pending} type="submit">
      { pending? <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : children  }
    </Button>
  )
}

export function SubmitButton2({form, children, className}: { form: any, children: ReactNode, className?: string }) {
  return(
    <Button type="submit" disabled={form.formState.isSubmitting} className={`${className}`}>
      {form.formState.isSubmitting? <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : children}
    </Button>
  )
}
