import { type FormEvent, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Phone, UserRound, Users, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cottages } from "@/data/cottages";

type BookingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCottage?: string;
};

type BookingFormState = {
  name: string;
  contactNumber: string;
  date: string;
  cottageType: string;
  persons: string;
};

const defaultState: BookingFormState = {
  name: "",
  contactNumber: "",
  date: "",
  cottageType: cottages[0]?.name ?? "",
  persons: "",
};

export const BookingModal = ({ open, onOpenChange, initialCottage }: BookingModalProps) => {
  const [form, setForm] = useState<BookingFormState>(defaultState);

  useEffect(() => {
    if (open) {
      setForm((current) => ({
        ...current,
        cottageType: initialCottage ?? current.cottageType ?? cottages[0]?.name ?? "",
      }));
    }
  }, [initialCottage, open]);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Booking request sent", {
      description: `We’ll contact ${form.name || "you"} shortly about the ${form.cottageType} booking.`,
    });
    setForm(defaultState);
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-primary/35 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-border/70 bg-card/95 p-6 shadow-elevated backdrop-blur-xl sm:p-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <DialogPrimitive.Title className="font-display text-2xl font-semibold text-foreground">
                      Reserve your island stay
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-sm leading-6 text-muted-foreground">
                      Share your preferred date and cottage details and we’ll confirm availability.
                    </DialogPrimitive.Description>
                  </div>
                  <DialogPrimitive.Close asChild>
                    <Button variant="glass" size="icon" aria-label="Close booking modal">
                      <X />
                    </Button>
                  </DialogPrimitive.Close>
                </div>

                <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                  <label className="space-y-2 text-sm font-medium text-foreground">
                    <span>Name</span>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="h-12 rounded-2xl border-border/70 bg-background/70 pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground">
                    <span>Contact Number</span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        type="tel"
                        value={form.contactNumber}
                        onChange={(event) => updateField("contactNumber", event.target.value)}
                        className="h-12 rounded-2xl border-border/70 bg-background/70 pl-10"
                        placeholder="09xx xxx xxxx"
                      />
                    </div>
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground">
                    <span>Date</span>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(event) => updateField("date", event.target.value)}
                        className="h-12 rounded-2xl border-border/70 bg-background/70 pl-10"
                      />
                    </div>
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground">
                    <span>Cottage Type</span>
                    <Select value={form.cottageType} onValueChange={(value) => updateField("cottageType", value)}>
                      <SelectTrigger className="h-12 rounded-2xl border-border/70 bg-background/70">
                        <SelectValue placeholder="Choose a cottage" />
                      </SelectTrigger>
                      <SelectContent>
                        {cottages.map((cottage) => (
                          <SelectItem key={cottage.name} value={cottage.name}>
                            {cottage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground sm:col-span-2">
                    <span>Number of persons</span>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        required
                        type="number"
                        min="1"
                        value={form.persons}
                        onChange={(event) => updateField("persons", event.target.value)}
                        className="h-12 rounded-2xl border-border/70 bg-background/70 pl-10"
                        placeholder="How many guests?"
                      />
                    </div>
                  </label>

                  <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline" size="lg" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="hero" size="lg">
                      Submit Booking Request
                    </Button>
                  </div>
                </form>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
