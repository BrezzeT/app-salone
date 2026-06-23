"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050507] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Logo & About */}
          <div className="flex flex-col gap-4">
            <span className="font-serif text-2xl tracking-widest uppercase text-white">
              Studio<span className="text-brand-accent">.</span>
            </span>
            <p className="text-sm text-brand-muted font-sans font-light leading-relaxed max-w-sm">
              Простір краси та індивідуального стилю. Творимо естетику, яка
              підкреслює вашу природну привабливість.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Навігація
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-brand-muted">
              <Link
                href="#about"
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                Про мене
              </Link>
              <Link
                href="#prices"
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                Прайс-лист
              </Link>
              <Link
                href="#works"
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                Портфоліо робіт
              </Link>
              <Link
                href="#reviews"
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                Відгуки
              </Link>
            </nav>
          </div>

          {/* Work Hours & Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Контакти
            </span>
            <div className="flex flex-col gap-3 text-sm text-brand-muted">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                <span>123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <span>+123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                <span>123</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold">
              Ми в соцмережах
            </span>
            <p className="text-sm text-brand-muted font-sans font-light leading-relaxed mb-1">
              Підписуйтесь на наші сторінки та стежте за новими роботами.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300 bg-white/2 hover:bg-white/4"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300 bg-white/2 hover:bg-white/4"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs text-brand-muted uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Studio. Всі права захищені.</p>
          <button
            onClick={scrollToTop}
            aria-label="Вгору"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-brand-accent/50 hover:text-brand-accent transition-all duration-300 bg-white/2 hover:bg-white/4 cursor-pointer"
          >
            <span>Вгору</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
