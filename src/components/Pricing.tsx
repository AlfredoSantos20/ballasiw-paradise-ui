import { motion } from "framer-motion";
import { Check, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cottages, type Cottage } from "@/data/cottages";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PricingCard = ({ cottage, onBookNow }: { cottage: Cottage; onBookNow: (cottageName?: string) => void }) => (
  <motion.article
    variants={cardVariants}
    whileHover={{ y: -8, scale: 1.01 }}
    className={[
      "resort-card relative flex h-full flex-col rounded-[28px] p-7",
      cottage.featured ? "border-accent/55 bg-card shadow-elevated" : "",
    ].join(" ")}
  >
    {cottage.featured ? (
      <div className="absolute right-6 top-6 rounded-full bg-sunrise px-3 py-1 text-xs font-semibold text-accent-foreground">
        Most Popular
      </div>
    ) : null}
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Cottage</p>
        <h3 className="font-display text-2xl font-semibold text-foreground">{cottage.name}</h3>
        <div className="flex items-end gap-2">
          <span className="font-display text-5xl font-semibold text-foreground">₱{cottage.price}</span>
          <span className="pb-1 text-sm text-muted-foreground">day use</span>
        </div>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-feature px-4 py-2 text-sm text-foreground">
        <Users className="h-4 w-4 text-primary" />
        Up to {cottage.capacity} persons
      </div>

      <ul className="space-y-3 text-sm text-muted-foreground">
        {cottage.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-highlight text-primary">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <Button variant={cottage.featured ? "hero" : "default"} size="lg" className="mt-8 w-full" onClick={() => onBookNow(cottage.name)}>
      Book Now
    </Button>
  </motion.article>
);

export const Pricing = ({ onBookNow }: { onBookNow: (cottageName?: string) => void }) => {
  return (
    <section id="cottages" className="theme-transition">
      <div className="section-shell">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <p className="section-kicker">Cottage pricing</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Choose the cottage that matches your island day.</h2>
          <p className="text-base leading-7 text-muted-foreground">
            Modern, affordable spaces for barkada trips, family outings, and easy beachfront celebrations.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {cottages.map((cottage) => (
            <PricingCard key={cottage.name} cottage={cottage} onBookNow={onBookNow} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
