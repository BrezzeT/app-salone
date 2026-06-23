"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface WorksSectionProps {
  master: {
    name: string;
    portfolio_urls?: string[] | null;
  };
}

function ParallaxColumn({
  children,
  speed,
  className,
}: {
  children: React.ReactNode;
  speed: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function WorksSection({ master }: WorksSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const defaultWorks = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=400&h=600",
  ];

  const works = master.portfolio_urls?.length
    ? master.portfolio_urls
    : defaultWorks;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev + 1) % works.length : null,
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev - 1 + works.length) % works.length : null,
    );
  };

  const col1 = works.filter((_, i) => i % 3 === 0);
  const col2 = works.filter((_, i) => i % 3 === 1);
  const col3 = works.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="works"
      className="w-full min-h-screen py-32 border-t border-white/5 bg-brand-bg relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-medium mb-3 block">
          портфоліо робіт
        </span>

        <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight mb-20">
          мої роботи
        </h2>

        {/* Desktop Parallax Grid Layout */}
        <div className="hidden md:flex gap-4 md:gap-8 w-full justify-center items-start">
          <ParallaxColumn
            speed={40}
            className="flex flex-col gap-6 md:gap-8 w-[28%]"
          >
            {col1.map((url, i) => {
              const originalIndex = works.indexOf(url);
              return (
                <div
                  key={`col1-${i}`}
                  className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
                  onClick={() => setActiveImageIndex(originalIndex)}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 border border-brand-accent/30 bg-brand-bg/85 backdrop-blur-sm rounded-full text-brand-accent text-[10px] font-medium uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center gap-2 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>дивитись</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </ParallaxColumn>

          <ParallaxColumn
            speed={-30}
            className="flex flex-col gap-6 md:gap-8 w-[40%] mt-12"
          >
            {col2.map((url, i) => {
              const originalIndex = works.indexOf(url);
              return (
                <div
                  key={`col2-${i}`}
                  className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 group cursor-pointer"
                  onClick={() => setActiveImageIndex(originalIndex)}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 border border-brand-accent/30 bg-brand-bg/85 backdrop-blur-sm rounded-full text-brand-accent text-[10px] font-medium uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center gap-2 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>дивитись</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </ParallaxColumn>

          <ParallaxColumn
            speed={60}
            className="flex flex-col gap-6 md:gap-8 w-[28%]"
          >
            {col3.map((url, i) => {
              const originalIndex = works.indexOf(url);
              return (
                <div
                  key={`col3-${i}`}
                  className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
                  onClick={() => setActiveImageIndex(originalIndex)}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 border border-brand-accent/30 bg-brand-bg/85 backdrop-blur-sm rounded-full text-brand-accent text-[10px] font-medium uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center gap-2 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>дивитись</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </ParallaxColumn>
        </div>

        {/* Mobile Grid Layout (Show All Images) */}
        <div className="grid grid-cols-2 gap-4 w-full md:hidden">
          {works.map((url, i) => (
            <div
              key={`mobile-work-${i}`}
              className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-md border border-white/10 group cursor-pointer"
              onClick={() => setActiveImageIndex(i)}
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
            onClick={() => setActiveImageIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 z-10"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Закрити"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors cursor-pointer p-4 z-10"
              onClick={handlePrev}
              aria-label="Попередня робота"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors cursor-pointer p-4 z-10"
              onClick={handleNext}
              aria-label="Наступна робота"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-[90vw] md:w-[70vw] lg:w-[50vw] h-[75vh] max-w-175 max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={works[activeImageIndex]}
                alt=""
                fill
                className="object-contain rounded-xl"
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 text-white/40 text-xs tracking-widest uppercase">
              {activeImageIndex + 1} / {works.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
