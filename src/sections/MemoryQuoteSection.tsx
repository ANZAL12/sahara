"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function MemoryQuoteSection() {
  const quote = "VENI VEDI VICI";
  
  return (
    <Section className="bg-[#F9F6F0] py-48 relative overflow-hidden border-b border-[#dcd8d0]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6b8e73]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle background image */}
      <div className="absolute inset-0 bg-[url('/memories/Acer_Wallpaper_05_3840x2400.jpg')] bg-cover bg-center opacity-[0.02] grayscale"></div>

      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative inline-block w-full max-w-screen-xl"
        >
          {/* Old English, single-line, tight tracking, and scribble typing effect */}
          <div className="flex flex-nowrap justify-center items-baseline gap-x-1 md:gap-x-3 select-none py-10">
            {'"Vini Vidi Vici"'.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.1, 
                  delay: 0.2 + i * 0.08,
                  type: "spring",
                  stiffness: 250,
                  damping: 15
                }}
                viewport={{ once: true }}
                style={{ fontFamily: '"Old English Text MT", serif' }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] leading-none text-[#2C2C2C] drop-shadow-xl font-bold tracking-tighter antialiased flex-shrink-0 hover:text-[#bb8d62] transition-colors duration-500"
              >
                {char === " " ? "\u00A0\u00A0" : char}
              </motion.span>
            ))}
          </div>
          
          {/* Realistic Hand-Drawn Wavy Underline */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-16">
            <svg
              className="w-full h-full text-[#6b8e73] opacity-60"
              viewBox="0 0 400 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M10 25 C60 15 100 35 150 30 C200 25 250 45 300 35 C350 25 390 35 395 25"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 2.2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M15 28 C65 18 105 38 155 33 C205 28 255 48 305 38 C355 28 395 38 400 28"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 2.3, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="opacity-40"
              />
            </svg>
          </div>

          <motion.p 
            className="mt-32 text-[#646464] font-serif italic text-2xl md:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            viewport={{ once: true }}
          >
            We came, We saw, We conquered Together
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}