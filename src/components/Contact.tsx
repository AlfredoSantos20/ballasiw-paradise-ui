import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+63 912 345 6789",
    href: "tel:+639123456789",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@ballasiwresort.com",
    href: "mailto:hello@ballasiwresort.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ballasiw Island, Northern Samar, Philippines",
    href: "https://maps.google.com/?q=Ballasiw+Island+Resort",
  },
];

export const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("name");

    toast.success("Message sent", {
      description: `Thanks${name ? `, ${name}` : ""}. We’ll get back to you soon.`,
    });
    form.reset();
  };

  return (
    <section id="contact" className="theme-transition">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="section-heading">
              <p className="section-kicker">Contact</p>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Plan your visit with us.</h2>
              <p className="text-base leading-7 text-muted-foreground">
                Reach out for availability, group bookings, and directions to the resort.
              </p>
            </div>

            <div className="grid gap-4">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Location" ? "_blank" : undefined}
                  rel={item.label === "Location" ? "noreferrer" : undefined}
                  className="resort-card flex items-center gap-4 rounded-[24px] p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-feature text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">{item.label}</span>
                    <span className="mt-1 block font-medium text-foreground">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="overflow-hidden rounded-[28px] border border-border/70 shadow-soft">
              <iframe
                title="Ballasiw Island Resort map"
                src="https://www.google.com/maps?q=Northern%20Samar%20Philippines&z=8&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            className="resort-card rounded-[32px] p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold">Send us a message</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ask about cottage availability, rates, or your next family day trip.
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-feature text-primary transition-transform duration-300 hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-feature text-primary transition-transform duration-300 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <form className="grid gap-5" onSubmit={handleSubmit}>
              <label className="space-y-2 text-sm font-medium text-foreground">
                <span>Name</span>
                <Input name="name" required className="h-12 rounded-2xl border-border/70 bg-background/70" placeholder="Your name" />
              </label>
              <label className="space-y-2 text-sm font-medium text-foreground">
                <span>Email</span>
                <Input name="email" type="email" required className="h-12 rounded-2xl border-border/70 bg-background/70" placeholder="your@email.com" />
              </label>
              <label className="space-y-2 text-sm font-medium text-foreground">
                <span>Message</span>
                <Textarea
                  name="message"
                  required
                  className="min-h-[150px] rounded-3xl border-border/70 bg-background/70"
                  placeholder="Tell us about your visit plans"
                />
              </label>
              <Button type="submit" variant="hero" size="lg" className="w-full sm:w-fit">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
