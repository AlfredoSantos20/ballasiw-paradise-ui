import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";

import heroImage from "@/assets/images/ballasiw-hero.jpg";
import { Button } from "@/components/ui/button";

type HeroProps = {
  onBookNow: () => void;
};

export const Hero = ({ onBookNow }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : 60]);
  const contentY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -35]);

  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden pt-24">
      <motion.img
        src={heroImage}
        alt="Ballasiw Island Resort beachfront at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: prefersReducedMotion ? 1 : 1.08 }}
        initial={{ scale: 1.16, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />

      <motion.div
        className="section-shell relative z-10 pb-16 md:pb-24"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      >
        <div className="max-w-3xl space-y-8 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Tropical beachfront getaway
          </div>

          <div className="space-y-5">
            <motion.h1
              className="font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              Ballasiw Island Resort
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-primary-foreground/88 sm:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
            >
              Relax. Unwind. Experience Paradise.
            </motion.p>
            <motion.p
              className="max-w-2xl text-sm leading-7 text-primary-foreground/72 sm:text-base"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
            >
              Oceanfront cottages, warm island sunsets, and effortless moments designed for family escapes, day trips, and laid-back celebrations.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52 }}
          >
            <Button variant="hero" size="xl" onClick={onBookNow}>
              Book Now
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#cottages">View Cottages</a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/80"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.62 }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Beachfront location
            </div>
            <div>Day-use cottages from ₱500</div>
            <div>Family-friendly island vibe</div>
          </motion.div>
        </div>

        <motion.a
          href="#cottages"
          className="mt-12 inline-flex items-center gap-2 text-sm text-primary-foreground/78 transition-colors hover:text-primary-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Explore the resort
          <ChevronDown className="h-4 w-4 animate-float" />
        </motion.a>
      </motion.div>
    </section>
  );
};
