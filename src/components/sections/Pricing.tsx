"use client";

import { motion } from "framer-motion";

interface ServiceItem {
  name: string;
  price: string;
  duration: string;
}

export default function PricingSection() {
  const services: ServiceItem[] = [
    {
      name: "Складне фарбування (AirTouch, Balayage, Shatush)",
      price: "від 3 200 ₴",
      duration: "4–5 год",
    },
    {
      name: "Однотонне фарбування (корінь або вся довжина)",
      price: "від 1 800 ₴",
      duration: "2 год",
    },
    {
      name: "Стрижка жіноча (включаючи миття та укладку)",
      price: "800 ₴",
      duration: "1–1.5 год",
    },
    {
      name: "Преміальний догляд та відновлення (Olaplex, K18)",
      price: "1 200 ₴",
      duration: "1 год",
    },
    {
      name: "Експрес-укладка (браш / праска)",
      price: "500 ₴",
      duration: "45 хв",
    },
    {
      name: "Вечірня або весільна зачіска",
      price: "від 1 200 ₴",
      duration: "1.5–2 год",
    },
  ];

  return (
    <section
      id="prices"
      className="w-full min-h-screen py-32 border-t border-white/5 bg-brand-bg relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-medium mb-3 block">
          послуги та вартість
        </span>

        <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight mb-20">
          прайс-лист
        </h2>

        <div className="w-full flex flex-col gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 pb-6 border-b border-white/5 group hover:border-brand-accent/20 transition-colors duration-300"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-base md:text-lg text-white font-sans font-light tracking-wide group-hover:text-brand-accent transition-colors duration-300">
                  {service.name}
                </span>
                <span className="text-xs text-brand-muted uppercase tracking-widest font-medium font-sans">
                  тривалість: {service.duration}
                </span>
              </div>
              <div className="text-xl md:text-2xl text-brand-accent font-serif font-light tracking-wider whitespace-nowrap">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
