"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";

interface FestEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  venue?: string;
  image_url?: string;
}

export default function FestSection() {
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchFestEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('type', 'Sahara Fest')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching fest events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFestEvents();
  }, []);

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <Section className="bg-[#F9F6F0] min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#6b8e73]" />
      </Section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  const currentEvent = events[currentIndex];

  return (
    <Section className="bg-[#F9F6F0] overflow-hidden relative py-32 border-b border-[#dcd8d0]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#6b8e73]/3 skew-x-[-12deg] translate-x-32 pointer-events-none" />

      <Container>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#6b8e73]/20 bg-white shadow-sm text-[#4A5D4E] text-xs uppercase tracking-widest font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-[#bb8d62]" />
            Upcoming Celebrations
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-[#2C2C2C] mb-6 tracking-tight">
            Experience the <span className="text-[#6b8e73] italic">Spirit</span> of Sahara
          </h2>
          <p className="text-xl text-[#646464] max-w-2xl mx-auto font-serif italic">
            Join us for unforgettable events celebrating our community's vibrant culture.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-12 gap-0 shadow-2xl rounded-sm overflow-hidden bg-white border border-[#ebe6dc]"
            >
              {/* Event Postcard Image */}
              <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden group">
                <Image
                  src={currentEvent.image_url || "/memories/Acer_Wallpaper_03_3840x2400.jpg"}
                  alt={currentEvent.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                {/* "Postage Stamp" Overlay */}
                <div className="absolute top-8 right-8 w-20 h-24 bg-white/90 backdrop-blur-sm border-2 border-dashed border-[#dcd8d0] p-2 flex flex-col items-center justify-center rotate-3 shadow-md">
                  <div className="w-12 h-12 rounded-full border border-[#bb8d62] flex items-center justify-center opacity-60">
                    <span className="text-[10px] text-[#bb8d62] font-serif font-bold">SAHARA</span>
                  </div>
                  <span className="text-[10px] mt-2 font-serif text-[#a4a4a4]">Est. 1995</span>
                </div>
              </div>

              {/* Event Details (Invitation Style) */}
              <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center relative">
                {/* Paper Texture Overlay for Card */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-10 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-4xl font-serif font-bold text-[#2C2C2C] mb-8 leading-tight">
                    {currentEvent.title}
                  </h3>

                  <p className="text-[#646464] mb-12 font-serif italic text-lg leading-relaxed">
                    {currentEvent.description || "Be part of this amazing celebration and create memories that will last a lifetime."}
                  </p>

                  <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#dcd8d0] transition-colors group-hover:border-[#6b8e73]">
                        <Calendar className="w-5 h-5 text-[#6b8e73]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#bb8d62]">When</span>
                        <span className="text-[#2C2C2C] font-serif font-medium">{new Date(currentEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#dcd8d0] transition-colors group-hover:border-[#6b8e73]">
                        <Clock className="w-5 h-5 text-[#6b8e73]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#bb8d62]">Time</span>
                        <span className="text-[#2C2C2C] font-serif font-medium">{currentEvent.time || "10:00 AM onwards"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#dcd8d0] transition-colors group-hover:border-[#6b8e73]">
                        <MapPin className="w-5 h-5 text-[#6b8e73]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest font-bold text-[#bb8d62]">Where</span>
                        <span className="text-[#2C2C2C] font-serif font-medium">{currentEvent.venue || "Sahara Campus Grounds"}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/events"
                      className="inline-block w-full text-center bg-[#6b8e73] hover:bg-[#5a7a61] text-white font-medium rounded-sm py-5 px-10 text-lg transition-all duration-300 shadow-lg"
                    >
                      Reserve Your Spot
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          {events.length > 1 && (
            <div className="flex justify-center gap-6 mt-12 pb-10">
              <button
                onClick={prevEvent}
                className="rounded-full w-14 h-14 border border-[#dcd8d0] hover:border-[#6b8e73] hover:bg-white text-[#646464] hover:text-[#2C2C2C] flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 px-8 bg-white border border-[#ebe6dc] rounded-full text-lg font-serif italic text-[#646464] shadow-sm">
                <span className="text-[#6b8e73] font-bold">{currentIndex + 1}</span> / {events.length}
              </div>
              <button
                onClick={nextEvent}
                className="rounded-full w-14 h-14 border border-[#dcd8d0] hover:border-[#6b8e73] hover:bg-white text-[#646464] hover:text-[#2C2C2C] flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}