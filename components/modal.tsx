"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Modal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Animal</DialogTitle>
          <DialogDescription>
            Make changes to the animal information here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* Form fields would go here */}</div>
        <Button type="submit" onClick={() => setOpen(false)}>
          Save changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
