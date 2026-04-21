import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import heroImage from "@/assets/images/ballasiw-hero.jpg";
import { ReusableButtons } from "@/components/customs/reusable_buttons";

type TypePhase = "typingTitle" | "typingSubtitle" | "erasingSubtitle" | "erasingTitle";

const useConnectedTypewriter = (title: string, subtitle: string) => {
  const [titleCount, setTitleCount] = useState(0);
  const [subtitleCount, setSubtitleCount] = useState(0);
  const [phase, setPhase] = useState<TypePhase>("typingTitle");

  useEffect(() => {
    const typeSpeed = 70;
    const eraseSpeed = 45;
    const fullPause = 1100;
    const transitionPause = 300;

    const delay =
      (phase === "typingTitle" && titleCount === title.length) ||
      (phase === "typingSubtitle" && subtitleCount === subtitle.length)
        ? fullPause
        : (phase === "erasingSubtitle" && subtitleCount === 0) || (phase === "erasingTitle" && titleCount === 0)
          ? transitionPause
          : phase === "erasingSubtitle" || phase === "erasingTitle"
            ? eraseSpeed
            : typeSpeed;

    const timer = window.setTimeout(() => {
      if (phase === "typingTitle") {
        if (titleCount < title.length) {
          setTitleCount((current) => current + 1);
          return;
        }
        setPhase("typingSubtitle");
        return;
      }

      if (phase === "typingSubtitle") {
        if (subtitleCount < subtitle.length) {
          setSubtitleCount((current) => current + 1);
          return;
        }
        setPhase("erasingSubtitle");
        return;
      }

      if (phase === "erasingSubtitle") {
        if (subtitleCount > 0) {
          setSubtitleCount((current) => current - 1);
          return;
        }
        setPhase("erasingTitle");
        return;
      }

      if (titleCount > 0) {
        setTitleCount((current) => current - 1);
        return;
      }
      setPhase("typingTitle");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phase, subtitle, subtitleCount, title, titleCount]);

  return {
    titleText: title.slice(0, titleCount),
    subtitleText: subtitle.slice(0, subtitleCount),
    activeLine: phase === "typingSubtitle" || phase === "erasingSubtitle" ? "subtitle" : "title",
  };
};

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : 60]);
  const contentY = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -35]);
  const { titleText, subtitleText, activeLine } = useConnectedTypewriter(
    "Ballasiw Island Resort",
    "Relax. Unwind. Experience Paradise.",
  );

  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden pt-24">
      <motion.img
        src={heroImage}
        alt="Ballasiw Island Resort"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y: imageY, scale: prefersReducedMotion ? 1 : 1.08 }}
        initial={{ scale: 1.16, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-hero dark:bg-[linear-gradient(115deg,rgba(3,35,68,0.62),rgba(3,35,68,0.38)_45%,rgba(3,35,68,0.12)_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent dark:from-transparent" />

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
            Your Perfect Resort Escape
          </div>

          <div className="space-y-5">
            <motion.h1
              className="font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              {titleText}
              {activeLine === "title" ? (
                <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-primary-foreground align-middle" />
              ) : null}
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-primary-foreground/88 sm:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
            >
              {subtitleText}
              {activeLine === "subtitle" ? (
                <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-primary-foreground align-middle" />
              ) : null}
            </motion.p>
            <motion.p
              className="max-w-2xl text-sm leading-7 text-primary-foreground/72 sm:text-base"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
            >
              Riverfront cottages immersed in nature, golden sunsets, and peaceful moments for family getaways, day trips, and easygoing celebrations.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52 }}
          >
            <ReusableButtons label="View Cottages" href="#cottages" size="xl" />
            <ReusableButtons label="Contact Us" href="#contact" variant="glass" gradient={false} size="xl" />
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/80"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.62 }}
          >
        
          </motion.div>
        </div>

       
      </motion.div>
    </section>
  );
};
