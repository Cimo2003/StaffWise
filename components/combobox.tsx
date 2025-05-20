"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"

export function ComboboxForm({options, name, defaultValue, placeholder, form, label}: {options: any[]|undefined, name: string, defaultValue?: any, placeholder: string, form: any, label?: string}) {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Update selected item when field value changes
  useEffect(() => {
    const value = form.getValues(name)
    if (value && options) {
      const selected = options.find(item => item.id === value)
      if (selected) {
        setSelectedItem(selected)
      }
    }
  }, [form, name, options])

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => {
        // Find the selected option based on field value
        const selectedOption = options?.find(option => option.id === field.value)
        
        return (
          <FormItem className="flex flex-col col-span-2">
            {
              label &&
              <FormLabel>{label}</FormLabel>
            }
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "justify-between bg-white",
                      !selectedOption && !selectedItem && "text-muted-foreground"
                    )}
                    onClick={() => setOpen(!open)}
                  >
                    {selectedOption ? selectedOption.name : 
                     selectedItem ? selectedItem.name : 
                     placeholder}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder={placeholder} className="h-9"/>
                  <CommandList>
                    <CommandEmpty>No Results.</CommandEmpty>
                    <CommandGroup>
                      {options?.map((item) => (
                        <CommandItem
                          value={item.name}
                          key={item.id}
                          onSelect={() => {
                            form.setValue(name, item.id, { shouldValidate: true })
                            setSelectedItem(item)
                            setOpen(false)
                          }}
                        >
                          {item.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              item.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}