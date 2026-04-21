import { motion } from "framer-motion";
import { Check, Users } from "lucide-react";

import { ReusableButtons } from "@/components/customs/reusable_buttons";
import { cottages, type Cottage } from "@/data/cottages";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardSubtitles = [
  "Good for larger groups",
  "Good for family use",
  "Good for private events",
  "Good for budget trips",
];

const PricingCard = ({ cottage, index }: { cottage: Cottage; index: number }) => {
  const isPopular = index === 2;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.01 }}
      className={[
        "relative flex h-full flex-col rounded-[22px] border bg-card p-7 shadow-sm transition-all duration-300",
        isPopular
          ? "border-2 border-primary bg-primary text-primary-foreground shadow-[0_24px_42px_-24px_hsl(var(--primary)/0.65)] dark:border-white dark:bg-white dark:text-black"
          : "border-border/80 bg-card text-foreground",
      ].join(" ")}
    >
      {isPopular ? (
        <div className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
          Most Popular
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className={["font-display text-xl font-semibold", isPopular ? "text-primary-foreground dark:text-black" : "text-foreground"].join(" ")}>
            {cottage.name}
          </h3>
          <p className={["text-sm", isPopular ? "text-primary-foreground/90 dark:text-black/80" : "text-muted-foreground"].join(" ")}>
            {cardSubtitles[index] ?? "Good for day use"}
          </p>
          <div className="flex items-end gap-2">
            <span className={["font-display text-4xl font-semibold leading-none", isPopular ? "text-primary-foreground dark:text-black" : "text-foreground"].join(" ")}>
              ₱{cottage.price.toLocaleString()}
            </span>
            <span className={["pb-1 text-sm", isPopular ? "text-primary-foreground/90 dark:text-black/80" : "text-muted-foreground"].join(" ")}>
              day use
            </span>
          </div>
        </div>

        <div
          className={[
            "inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-xs",
            isPopular
              ? "bg-primary-foreground/20 text-primary-foreground dark:bg-black/10 dark:text-black"
              : "bg-feature text-foreground",
          ].join(" ")}
        >
          <Users className={["h-4 w-4", isPopular ? "text-primary-foreground dark:text-black" : "text-primary"].join(" ")} />
          Up to {cottage.capacity} persons
        </div>

        <ul className={["space-y-2 text-xs", isPopular ? "text-primary-foreground dark:text-black/80" : "text-muted-foreground"].join(" ")}>
          {cottage.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={[
                  "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
                  isPopular
                    ? "bg-primary-foreground/25 text-primary-foreground dark:bg-black/10 dark:text-black"
                    : "bg-highlight text-primary",
                ].join(" ")}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <ReusableButtons
        label="Avail this plan"
        href="#contact"
        size="default"
        variant="default"
        gradient
        className="mt-8 w-full rounded-xl text-sm font-semibold"
      />
    </motion.article>
  );
};

export const Pricing = () => {
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
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Choose the cottage that matches your island day.</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Modern, affordable spaces for barkada trips, family outings, and easy beachfront celebrations.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {cottages.map((cottage, index) => (
            <PricingCard key={cottage.name} cottage={cottage} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
