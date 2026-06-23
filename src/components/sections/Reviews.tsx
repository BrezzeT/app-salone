"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Марина К.",    text: "Неймовірний результат! Давно шукала майстра, який зрозуміє, чого я хочу. Люба зробила саме те, про що я мріяла — колір вийшов фантастичний, довго тримається.",    service: "Складне фарбування", rating: 5, date: "Червень 2026" },
  { name: "Олена В.",     text: "Дуже задоволена! Прийшла із зламаним волоссям після невдалого фарбування в іншому салоні. Після процедури відновлення волосся стало живим і шовковистим.",          service: "Преміальний догляд",   rating: 5, date: "Травень 2026" },
  { name: "Аліна Т.",     text: "Робила весільну зачіску — була дуже хвилювалась, але Люба все зробила бездоганно. Зачіска протрималась весь день і виглядала ідеально на фото.",              service: "Весільна зачіска",    rating: 5, date: "Квітень 2026" },
  { name: "Діана С.",     text: "Вже вдруге роблю AirTouch у Люби. Результат щоразу краще. Дуже приємна атмосфера, майстер уважно слухає та пояснює кожен крок. Рекомендую всім!",           service: "AirTouch",           rating: 5, date: "Березень 2026" },
  { name: "Катерина Р.",  text: "Стрижка вийшла просто чудова — саме те, що хотіла. Укладка тримається вже третій день. Майстер дала багато корисних порад по догляду.",                   service: "Стрижка та укладка",  rating: 5, date: "Лютий 2026" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section id="reviews" className="w-full min-h-screen py-32 border-t border-white/5 bg-brand-bg relative overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">

        <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-medium mb-3 block">
          відгуки клієнтів
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase leading-tight">
            що кажуть<br />клієнти
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
        <div className="hidden md:grid grid-cols-3 gap-6 relative">
          {[-1, 0, 1].map((offset) => {
            const index = (active + offset + reviews.length) % reviews.length;
            const review = reviews[index];
            const isCenter = offset === 0;

            return (
              <motion.div
                key={`${active}-${offset}`}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: isCenter ? 1 : 0.4, x: 0, scale: isCenter ? 1 : 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className={`relative flex flex-col gap-6 p-8 rounded-2xl border transition-all duration-500 ${
                  isCenter
                    ? "border-brand-accent/30 bg-white/4"
                    : "border-white/5 bg-white/2 hidden md:flex"
                }`}
              >
                <StarRating count={review.rating} />

                <p className="text-base md:text-lg text-white/90 font-sans font-light leading-relaxed italic">
                  {`"${review.text}"`}
                </p>

                <div className="mt-auto border-t border-white/5 pt-5 flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-white font-sans font-medium tracking-wide">
                      {review.name}
                    </span>
                    <span className="text-xs text-brand-accent uppercase tracking-widest font-medium">
                      {review.service}
                    </span>
                  </div>
                  <span className="text-xs text-brand-muted font-sans">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Centered Draggable Card Layout */}
        <div className="flex md:hidden flex-col items-center justify-center w-full min-h-95 relative px-4">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
            className="w-full flex flex-col items-center justify-between text-center py-10 px-6 bg-white/2 border border-white/5 rounded-3xl relative min-h-72.5 shadow-xl touch-pan-y"
          >
            {/* Massive gold quotes */}
            <span className="font-serif text-brand-accent text-6xl leading-none absolute -top-4 select-none opacity-40">“</span>
            
            <p className="text-base text-white/90 font-serif font-light leading-relaxed italic my-auto pt-4">
              {`"${reviews[active].text}"`}
            </p>
            
            <div className="flex flex-col items-center gap-1.5 mt-6 w-full">
              <StarRating count={reviews[active].rating} />
              <span className="text-sm font-medium text-white tracking-wide mt-1">{reviews[active].name}</span>
              <span className="text-[10px] text-brand-accent uppercase tracking-widest font-medium">{reviews[active].service}</span>
            </div>
          </motion.div>

          {/* Pagination dots */}
          <div className="flex gap-2 mt-8 justify-center">
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
