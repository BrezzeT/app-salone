"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ParallaxGallery } from "@/src/components/ui/paralax-gallery";

interface HeroSectionProps {
  portfolioUrls?: string[];
}

export default function HeroSection({ portfolioUrls = [] }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center opacity-50 md:opacity-70">
        <ParallaxGallery
          images={portfolioUrls}
          className="w-[120vw] md:w-[110vw] max-w-[1600px] mx-auto"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6">
        <div className="font-serif text-5xl sm:text-6xl md:text-8xl font-light tracking-wide leading-[1.1] text-white uppercase flex flex-col items-center space-y-3 mix-blend-difference">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            Мистецтво
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            Твого
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block text-brand-accent font-normal"
          >
            Втілення
          </motion.span>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-16 w-full sm:w-auto justify-center px-4">
          <button className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 bg-brand-accent text-black font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-lg">
            <Calendar className="w-4 h-4" />
            <span>Записатися</span>
          </button>
          
          <Link
            href="#prices"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 border border-white/20 text-white font-medium text-xs tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span>Наші послуги</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
