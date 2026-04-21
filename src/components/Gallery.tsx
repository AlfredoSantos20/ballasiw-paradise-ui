import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";

import beachImage from "@/assets/images/gallery-beach.jpg";
import cottageImage from "@/assets/images/gallery-cottage.jpg";
import sunsetImage from "@/assets/images/gallery-sunset.jpg";
import heroImage from "@/assets/images/ballasiw-hero.jpg";

const galleryItems = [
  {
    title: "Golden beachfront",
    description: "Quiet shoreline and clear water for slow island mornings.",
    image: heroImage,
    width: 1920,
    height: 1080,
  },
  {
    title: "Cottage moments",
    description: "Cozy shaded spaces built for small group getaways.",
    image: cottageImage,
    width: 960,
    height: 960,
  },
  {
    title: "Relaxed lagoon edge",
    description: "Swim, lounge, and enjoy easy beachside afternoons.",
    image: beachImage,
    width: 960,
    height: 960,
  },
  {
    title: "Sunset glow",
    description: "End the day with warm skies and calm island views.",
    image: sunsetImage,
    width: 960,
    height: 960,
  },
];

export const Gallery = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="theme-transition">
      <div className="section-shell">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="section-kicker">Gallery</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">A closer look at your next escape.</h2>
          <p className="text-base leading-7 text-muted-foreground">
            Tropical beachfront scenes, cottage spaces, and sunset moments from Ballasiw Island Resort.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              className="group resort-card relative overflow-hidden rounded-[28px] text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveImage(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/82 via-primary/24 to-transparent p-6 text-primary-foreground">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-sm text-sm text-primary-foreground/78">{item.description}</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage !== null ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-border/50 bg-card shadow-elevated"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary/70 text-primary-foreground backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                onClick={() => setActiveImage(null)}
                aria-label="Close image preview"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={galleryItems[activeImage].image}
                alt={galleryItems[activeImage].title}
                width={galleryItems[activeImage].width}
                height={galleryItems[activeImage].height}
                className="max-h-[80vh] w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};
