"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AboutSectionProps {
  master: {
    name: string;
    bio: string;
    photo_url?: string | null;
    portfolio_urls?: string[] | null;
  };
}

export default function AboutSection({ master }: AboutSectionProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600&h=800";

  let featuredImage = defaultImage;
  if (master.photo_url) {
    try {
      const trimmed = master.photo_url.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          featuredImage = parsed[0];
        } else if (typeof parsed === "string") {
          featuredImage = parsed;
        }
      } else {
        featuredImage = trimmed;
      }
    } catch {
      featuredImage = master.photo_url;
    }
  }

  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center pt-32 pb-20 lg:pt-44 lg:pb-32 border-t border-white/5 bg-brand-bg relative overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-medium mb-3 block">
          про майстра
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight mb-20">
          {master.name}
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group max-h-[75vh]">
              <Image
                src={featuredImage}
                alt={master.name}
                fill
                sizes="(max-w-1024px) 100vw, 550px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[50%] flex flex-col justify-center"
          >
            <p className="text-base md:text-lg text-brand-muted leading-relaxed font-sans font-light mb-10">
              {master.bio ||
                "Створення неповторного стилю, який підкреслює вашу індивідуальність та дарує впевненість у власній красі."}
            </p>

            <div className="border-t border-b border-white/10 py-6 flex flex-col gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-accent font-sans font-medium block mb-2">
                  спеціалізація
                </span>
                <p className="text-base md:text-lg text-white font-sans font-light tracking-wide">
                  Складне фарбування • Колористика • Стрижки • Преміальний
                  догляд
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-xs uppercase tracking-widest text-brand-accent font-sans font-medium block mb-2">
                  досвід роботи
                </span>
                <p className="text-base md:text-lg text-white font-sans font-light tracking-wide">
                  Понад 10 років в індустрії краси
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
