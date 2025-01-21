"use client";
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
  projectId: z.string().min(2, "Project ID must be at least 2 characters"),
  studyNo: z.string().min(2, "Study Number must be at least 2 characters"),
  studyTitle: z.string().min(2, "Study title must be at least 2 characters"),
  species: z.string().min(2, "Species must be at least 2 characters"),
  sponsorId: z.string().min(2, "Sponsor ID must be at least 2 characters"),
  sponsorName: z.string().min(2, "Sponsor Name must be at least 2 characters"),
  sd: z.string().min(2, "Study Director must be at least 2 characters"),
  deliveryDate: z
    .string()
    .min(2, "Delivery Date must be at least 2 characters"),
});

type CreateStudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateStudyModal({ isOpen, onClose }: CreateStudyModalProps) {
  //   const [remainingCapacity, setRemainingCapacity] = useState(MAX_CAPACITY);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "",
      studyTitle: "",
      species: "",
      sponsorId: "",
      sponsorName: "",
      sd: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Study Added",
      description: `${values.studyTitle} has been added.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Study</DialogTitle>
          <DialogDescription>
            Enter study details for the selected date range:
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>project Id</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studyNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>study Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studyTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study Title</FormLabel>
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
              name="sponsorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sponsor Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study director</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Date</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
