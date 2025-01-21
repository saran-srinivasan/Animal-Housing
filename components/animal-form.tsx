"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  species: z.string().min(2, {
    message: "Species must be at least 2 characters.",
  }),
  noOfAnimals: z.number().min(0, {
    message: "number must be a positive number.",
  }),
});

export function AnimalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: "",
      noOfAnimals: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Animal added",
      description: `${values.species} has been added to the system.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input placeholder="Cat" {...field} />
              </FormControl>
              <FormDescription>The species of the animal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noOfAnimals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Animals</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Number of the animal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
