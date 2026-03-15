"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Alumni {
  name: string;
  role: string;
  image: string;
  batch: string;
}

// Inline SVG for masking tape
const MaskingTape = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute z-10 opacity-80 mix-blend-multiply filter drop-shadow-sm ${className}`}
    width="80"
    height="30"
    viewBox="0 0 100 30"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5,15 C5,5 15,2 50,5 C80,8 95,5 98,15 C95,25 80,28 50,25 C15,22 5,25 2.5,15 Z"
      fill="#e3ddc8"
    />
  </svg>
);

export default function AlumniSpotlightSection({ alumni = [] }: { alumni: Alumni[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Extend data for a richer carousel if array is small
  const displayAlumni = alumni.length > 5 ? alumni : [...alumni, ...alumni, ...alumni].slice(0, 10);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-32 bg-[#F9F6F0] overflow-hidden min-h-screen flex flex-col justify-center border-t border-[#dcd8d0]">
      {/* Background Decor */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[url('/memories/Acer_Wallpaper_01_3840x2400.jpg')] bg-cover opacity-[0.03] rotate-12 pointer-events-none" />
      <div className="absolute top-40 left-10 text-8xl opacity-5 font-serif pointer-events-none select-none">
        Memories
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative px-6 z-10 flex flex-col lg:flex-row gap-16 items-center lg:items-start">
        {/* Sticky Title Column */}
        <div className="lg:w-1/4 lg:sticky lg:top-1/3 text-center lg:text-left pt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#2C2C2C] font-serif font-extrabold text-6xl md:text-7xl leading-[0.9] tracking-tight mb-8">
              This<br />
              is<br />
              <span className="text-[#6b8e73] italic">Us.</span>
            </h2>
            <p className="text-[#646464] text-lg font-serif italic max-w-sm mx-auto lg:mx-0">
              Flip through the pages of our shared history. These are the faces that make Sahara a home.
            </p>

            {/* Navigation Arrows (Desktop) */}
            <div className="hidden lg:flex gap-4 mt-12">
              <button
                onClick={() => scrollByAmount(-400)}
                disabled={!canScrollLeft}
                suppressHydrationWarning
                className={`p-4 rounded-full border-2 transition-all ${canScrollLeft
                    ? "border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#F9F6F0]"
                    : "border-[#dcd8d0] text-[#dcd8d0] cursor-not-allowed"
                  }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scrollByAmount(400)}
                disabled={!canScrollRight}
                suppressHydrationWarning
                className={`p-4 rounded-full border-2 transition-all ${canScrollRight
                    ? "border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#F9F6F0]"
                    : "border-[#dcd8d0] text-[#dcd8d0] cursor-not-allowed"
                  }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Column */}
        <div className="lg:w-3/4 w-full relative">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto pb-16 pt-10 px-8 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {displayAlumni.map((profile, i) => (
              <motion.div
                key={`${profile.name}-${i}`}
                className="shrink-0 snap-center relative"
                initial={{ opacity: 0, y: 50, rotate: (i % 2 === 0 ? 5 : -5) }}
                whileInView={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? 3 : -3) }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Polaroid Frame */}
                <div className="w-[300px] bg-white p-4 pb-12 rounded-sm shadow-xl border border-[#ebe6dc] relative flex flex-col">
                  {/* Randomly placed masking tape */}
                  <MaskingTape className={`-top-3 ${i % 2 === 0 ? '-left-6 -rotate-12' : 'right-4 rotate-6'}`} />

                  <div className="relative w-full h-[350px] overflow-hidden filter sepia-[0.1] contrast-[1.05]">
                    {profile.image ? (
                      <Image
                        src={profile.image}
                        fill
                        className="object-cover"
                        alt={profile.name}
                        sizes="300px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#ebe6dc] flex flex-col items-center justify-center text-[#a4a4a4]">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-serif italic">No Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Handwritten Note underneath */}
                  <div className="absolute bottom-3 left-0 w-full text-center px-4 font-marker">
                    <p className="text-[#2C2C2C] text-xl transform -rotate-2">{profile.name}</p>
                    <p className="text-[#646464] text-sm mt-1">{profile.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows (Mobile) */}
          <div className="flex lg:hidden justify-center gap-6 mt-4">
            <button
              onClick={() => scrollByAmount(-300)}
              className="p-3 bg-[#ebe6dc] rounded-full text-[#4A5D4E]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount(300)}
              className="p-3 bg-[#ebe6dc] rounded-full text-[#4A5D4E]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom styles to hide scrollbar cross-browser */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}