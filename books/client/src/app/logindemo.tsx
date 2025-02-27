"use client";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormMessage, FormLabel, FormControl} from "../components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
const formSchema = z.object({
  emailAddress: z.string().email(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    }
  });

  const handleSubmit = () => {}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
      <FormField control ={form.control} name ="emailAddress" render={({field}) =>{
        return <FormItem>
          <FormLabel>Email address</FormLabel>
          <FormControl>
            <Input
              placeholder="Email address"
              type="email" 
              {...field} 
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      }} />
      <Button type= "submit" className="w-full">Submit</Button>
    </form>
      </Form>
    </main>
  );
}