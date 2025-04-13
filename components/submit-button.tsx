'use client'
 
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { ReactNode } from 'react'
import { Spinner } from './spinner'
 
export function SubmitButton({className, children}: { className?: string , children: ReactNode}) {
  const { pending } = useFormStatus()
 
  return (
    <Button className={`${className}`} disabled={pending} type="submit">
      { pending? <Spinner size="sm" className="border-white text-white" /> : children  }
    </Button>
  )
}

export function SubmitButton2({form, children, className}: { form: any, children: ReactNode, className?: string }) {
  return(
    <Button type="submit" disabled={form.formState.isSubmitting} className={`${className}`}>
      {form.formState.isSubmitting? <Spinner size="sm" className="border-white text-white"  /> : children}
    </Button>
  )
}
