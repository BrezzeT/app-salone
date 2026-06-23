"use client";

import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "#about", label: "Про мене" },
    { href: "#prices", label: "Прайс" },
    { href: "#works", label: "Роботи" },
    { href: "#reviews", label: "Відгуки" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-brand-bg/95 backdrop-blur-md border-b border-white/5 h-20 flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 md:px-12 flex items-center justify-between">
        <Link
          href={slug ? `/${slug}` : "/"}
          className="font-serif text-lg md:text-2xl tracking-widest uppercase hover:opacity-80 transition-opacity whitespace-nowrap z-50"
        >
          Studio<span className="text-brand-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-xs tracking-widest uppercase font-medium text-brand-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <button className="flex items-center gap-2.5 px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-none hover:bg-brand-accent hover:text-white transition-all duration-300 cursor-pointer">
            <Calendar className="w-3.5 h-3.5" />
            Записатися
          </button>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 cursor-pointer z-50"
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-screen bg-brand-bg z-40 flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl tracking-widest uppercase text-white hover:text-brand-accent transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-8 pb-10"
            >
              <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 cursor-pointer">
                <Calendar className="w-3.5 h-3.5" />
                Записатися
              </button>

              <div className="text-center text-xs tracking-widest uppercase text-brand-muted flex flex-col gap-2">
                <p>123</p>
                <p>+123</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
