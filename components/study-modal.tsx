"use client";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  studyName: z.string().min(2, "Study name must be at least 2 characters"),
  species: z.string().min(2, "Species must be at least 2 characters"),
  numberOfAnimals: z.number().min(1, "Number of animals must be at least 1"),
});

type StudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dateRange: DateRange | undefined;
};

// This would typically come from your backend or state management
const MAX_CAPACITY = 50;
const getExistingAnimals = (start: Date, end: Date) => {
  // Simulating an API call or database query
  console.log("Fetching existing animals for date range:", start, end);

  return 40;
};

export function StudyModal({ isOpen, onClose, dateRange }: StudyModalProps) {
  const [remainingCapacity] = useState(MAX_CAPACITY);
  const { toast } = useToast();
  console.log(remainingCapacity);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyName: "",
      species: "",
      numberOfAnimals: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (dateRange?.from && dateRange?.to) {
      const existingAnimals = getExistingAnimals(dateRange.from, dateRange.to);
      const availableCapacity = MAX_CAPACITY - existingAnimals;

      if (values.numberOfAnimals <= availableCapacity) {
        // Process the submission
        toast({
          title: "Study Added",
          description: `${values.studyName} has been scheduled with ${values.numberOfAnimals} ${values.species}.`,
        });
        onClose();
      } else {
        const overflow = values.numberOfAnimals - availableCapacity;
        toast({
          title: "Capacity Exceeded",
          description: `Only ${availableCapacity} animals can be added for this date range. Please adjust the number of animals or choose different dates for the remaining ${overflow} animals.`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Study</DialogTitle>
          <DialogDescription>
            Enter study details for the selected date range:
            {dateRange?.from && dateRange?.to
              ? ` ${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
              : ""}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Species</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfAnimals"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Study</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
