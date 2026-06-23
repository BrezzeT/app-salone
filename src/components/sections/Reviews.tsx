"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Марина К.",
    text: "Неймовірний результат! Давно шукала майстра, який зрозуміє, чого я хочу. Люба зробила саме те, про що я мріяла — колір вийшов фантастичний, довго тримається.",
    date: "Червень 2026",
  },
  {
    name: "Олена В.",
    text: "Дуже задоволена! Прийшла із зламаним волоссям після невдалого фарбування в іншому салоні. Після процедури відновлення волосся стало живим і шовковистим.",
    date: "Травень 2026",
  },
  {
    name: "Аліна Т.",
    text: "Робила весільну зачіску — була дуже хвилювалась, але Люба все зробила бездоганно. Зачіска протрималась весь день і виглядала ідеально на фото.",
    date: "Квітень 2026",
  },
  {
    name: "Діана С.",
    text: "Вже вдруге роблю AirTouch у Люби. Результат щоразу краще. Дуже приємна атмосфера, майстер уважно слухає та пояснює кожен крок. Рекомендую всім!",
    date: "Березень 2026",
  },
  {
    name: "Катерина Р.",
    text: "Стрижка вийшла просто чудова — саме те, що хотіла. Укладка тримається вже третій день. Майстер дала багато корисних порад по догляду.",
    date: "Лютий 2026",
  },
];

export default function ReviewsSection() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section
      id="reviews"
      className="w-full min-h-screen py-32 border-t border-white/5 bg-brand-bg relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-medium mb-3 block">
          відгуки клієнтів
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight">
            що кажуть
            <br className="hidden md:block" />
            {reviews.length > 0 ? "клієнти" : "немає відгуків"}
          </h2>
          <div className="hidden md:flex gap-3">
            <button
              onClick={prev}
              aria-label="Попередній відгук"
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-accent/50 hover:text-brand-accent transition-all duration-300 cursor-pointer rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Наступний відгук"
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-accent/50 hover:text-brand-accent transition-all duration-300 cursor-pointer rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Carousel Layout */}
        <div className="hidden md:grid grid-cols-3 gap-12 relative">
          {[-1, 0, 1].map((offset) => {
            const index = (active + offset + reviews.length) % reviews.length;
            const review = reviews[index];
            const isCenter = offset === 0;

            return (
              <motion.div
                key={`${active}-${offset}`}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{
                  opacity: isCenter ? 1 : 0.3,
                  x: 0,
                  scale: isCenter ? 1 : 0.97,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className="relative flex flex-col justify-between gap-4 transition-all duration-500"
              >
                <p className="text-base md:text-lg text-white/80 font-sans font-light leading-relaxed italic">
                  &quot;{review.text}&quot;
                </p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <span className="text-sm font-medium text-brand-accent">
                    {review.name}
                  </span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Left-aligned Draggable Comment Layout */}
        <div className="flex md:hidden flex-col items-start justify-center w-full min-h-70 relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const swipe = info.offset.x;
                if (swipe < -50) {
                  next();
                } else if (swipe > 50) {
                  prev();
                }
              }}
              className="w-full flex flex-col justify-between py-6 relative min-h-55 touch-pan-y"
            >
              <p className="text-base text-white/80 font-sans font-light leading-relaxed italic mb-6">
                &quot;{reviews[active].text}&quot;
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-white/5 w-full mt-auto">
                <span className="text-sm font-medium text-brand-accent">
                  {reviews[active].name}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-wider">
                  {reviews[active].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex gap-2 mt-4 justify-start">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Відгук ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer h-1.5 ${
                  i === active
                    ? "w-6 bg-brand-accent"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex gap-2 mt-10 justify-center">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Відгук ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === active
                  ? "w-6 h-1.5 bg-brand-accent"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
