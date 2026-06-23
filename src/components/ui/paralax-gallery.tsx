"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface ParallaxGalleryProps {
  images: string[];
  className?: string;
}

export function ParallaxGallery({ images, className }: ParallaxGalleryProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=600",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=400&h=600",
  ];

  const displayImages = images?.length > 0 ? images : defaultImages;

  const getShuffledList = (imgList: string[], seed: number) => {
    const list = [...imgList];
    let tempSeed = seed;
    for (let i = list.length - 1; i > 0; i--) {
      tempSeed = (tempSeed * 9301 + 49297) % 233280;
      const j = Math.floor((tempSeed / 233280) * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  };

  const padImages = (imgList: string[]) => {
    const list = [...imgList];
    while (list.length < 10) {
      list.push(...imgList);
    }
    return list;
  };

  const loopCol1 = [
    ...padImages(getShuffledList(displayImages, 101)),
    ...padImages(getShuffledList(displayImages, 101)),
  ];
  const loopCol2 = [
    ...padImages(getShuffledList(displayImages, 202)),
    ...padImages(getShuffledList(displayImages, 202)),
  ].reverse();
  const loopCol3 = [
    ...padImages(getShuffledList(displayImages, 303)),
    ...padImages(getShuffledList(displayImages, 303)),
  ];

  return (
    <div className={cn("gallery-container gallery-group", className)}>
      <div className="gallery-mask" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block md:w-[28%] overflow-hidden"
      >
        <div className="flex flex-col gallery-column-up-slow">
          {loopCol1.map((src, i) => (
            <div key={`c1-${i}`} className="w-full pb-6 md:pb-10">
              <Image
                src={src}
                alt=""
                width={400}
                height={533}
                className="gallery-item w-full h-auto object-cover rounded-2xl aspect-3/4"
                priority={i < 10}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-[48%] md:w-[44%] overflow-hidden z-10"
      >
        <div className="flex flex-col gallery-column-down">
          {loopCol2.map((src, i) => (
            <div key={`c2-${i}`} className="w-full pb-8 md:pb-12">
              <Image
                src={src}
                alt=""
                width={500}
                height={667}
                className="gallery-item w-full h-auto object-cover rounded-2xl aspect-3/4"
                priority={i < 10}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-[48%] md:w-[28%] overflow-hidden"
      >
        <div className="flex flex-col gallery-column-up-fast">
          {loopCol3.map((src, i) => (
            <div key={`c3-${i}`} className="w-full pb-6 md:pb-10">
              <Image
                src={src}
                alt=""
                width={400}
                height={533}
                className="gallery-item w-full h-auto object-cover rounded-2xl aspect-3/4"
                priority={i < 10}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
