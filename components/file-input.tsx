import React, { forwardRef } from 'react'
import { Input } from "@/components/ui/input"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: string
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ accept, ...props }, ref) => {
    return (
      <Input
        type="file"
        ref={ref}
        accept={accept}
        {...props}
        multiple
      />
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }