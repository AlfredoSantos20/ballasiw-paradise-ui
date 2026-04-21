import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ThemeMode } from "@/hooks/useTheme";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Cottages", href: "#cottages" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHeroSection = !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={[
          "container flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 md:px-6",
          isScrolled
            ? "border-border/60 bg-background/82 shadow-soft backdrop-blur-lg"
            : "border-transparent bg-transparent backdrop-blur-lg",
        ].join(" ")}
      >
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Ballasiw Island Resort logo"
            className="h-11 w-11 rounded-full object-cover"
            width={44}
            height={44}
            loading="lazy"
          />
          <div className="hidden sm:block">
            <p className={["font-display text-base font-semibold", isHeroSection ? "text-white" : "text-foreground"].join(" ")}>
              Ballasiw Island Resort
            </p>
            <p className={["text-xs", isHeroSection ? "text-white/80" : "text-foreground/65"].join(" ")}>Experience Comfort at Its Finest Resort</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={["text-sm font-medium transition-colors duration-300", isHeroSection ? "text-white hover:text-white/80" : "nav-link"].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="glass"
            size="icon"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="glass"
            size="icon"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="container mt-3 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="glass-panel rounded-3xl px-5 py-5">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-link text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
};
