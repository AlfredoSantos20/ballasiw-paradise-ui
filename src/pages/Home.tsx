import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Umbrella } from "lucide-react";
import { useState } from "react";

import { BookingModal } from "@/components/BookingModal";
import { Contact } from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const aboutFeatures = [
  {
    title: "Beachfront",
    description: "Steps away from calm waters, bright sand, and wide-open island views.",
    icon: Umbrella,
  },
  {
    title: "Family-friendly",
    description: "Relaxed spaces made for barkada trips, reunions, and easy group hangouts.",
    icon: Sparkles,
  },
  {
    title: "Affordable",
    description: "Simple, accessible cottage rates so more guests can enjoy the island day.",
    icon: ShieldCheck,
  },
];

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCottage, setSelectedCottage] = useState<string | undefined>(undefined);

  const openBooking = (cottageName?: string) => {
    setSelectedCottage(cottageName);
    setIsBookingOpen(true);
  };

  return (
    <div className="theme-transition min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} onBookNow={() => openBooking()} />
      <main>
        <Hero onBookNow={() => openBooking()} />
        <Pricing onBookNow={openBooking} />

        <section id="about" className="theme-transition">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div
                className="section-heading"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <p className="section-kicker">About the resort</p>
                <h2 className="font-display text-3xl font-semibold sm:text-4xl">A clean, tropical escape designed for simple island joy.</h2>
                <p className="text-base leading-7 text-muted-foreground">
                  Ballasiw Island Resort offers a warm beachfront setting with open-air cottages, clear coastal views, and a relaxed atmosphere for families and friends who want an easy day in paradise.
                </p>
                <Button variant="hero" size="lg" className="mt-3 w-fit" onClick={() => openBooking()}>
                  Plan Your Visit
                </Button>
              </motion.div>

              <motion.div
                className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
              >
                {aboutFeatures.map((feature, index) => (
                  <motion.article
                    key={feature.title}
                    className="resort-card flex items-start gap-4 rounded-[28px] p-6"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-feature text-primary shadow-soft">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <Gallery />
        <Contact />
      </main>

      <footer className="border-t border-border/60 bg-surface/70">
        <div className="container flex flex-col gap-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">Ballasiw Island Resort</p>
            <p className="mt-1">Relax. Unwind. Experience Paradise.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="nav-link" href="#home">
              Home
            </a>
            <a className="nav-link" href="#gallery">
              Gallery
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </div>
          <p>© 2026 Ballasiw Island Resort. All rights reserved.</p>
        </div>
      </footer>

      <BookingModal
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        initialCottage={selectedCottage}
      />
    </div>
  );
};

export default Home;
