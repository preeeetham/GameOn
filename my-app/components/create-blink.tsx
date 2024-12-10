"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { useState } from "react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.string().min(1, "Amount is required"),
})

export function CreateBlink() {
  const [files, setFiles] = useState<File[]>([])
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov']
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one file",
        variant: "destructive",
      })
      return
    }

    // Here you would typically handle the form submission
    console.log(values, files)
    toast({
      title: "Success",
      description: "Your Blink has been created!",
    })
  }

  return (
    <Card className="p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Create a Blink</h2>
        <p className="text-muted-foreground">
          Share your content and set your price
        </p>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                <span>{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFiles(files.filter((_, i) => i !== index))
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-xl font-medium">Drop your files here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                Support for images and videos
              </p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...form.register("title")}
            placeholder="Give your Blink a title"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...form.register("description")}
            placeholder="Describe what you're sharing"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (in crypto)</Label>
          <Input
            id="amount"
            {...form.register("amount")}
            placeholder="0.0"
            type="number"
            step="0.000001"
          />
          {form.formState.errors.amount && (
            <p className="text-sm text-destructive">
              {form.formState.errors.amount.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Blink
        </Button>
      </form>
    </Card>
  )
}