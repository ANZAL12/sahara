"use client";

import { useEffect, useState } from "react";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import BatchNetworkSection from "../sections/BatchNetworkSection";
import FestSection from "../sections/FestSection";
import AlumniSpotlightSection from "../sections/AlumniSpotlightSection";
import MemoryQuoteSection from "../sections/MemoryQuoteSection";
import CTASection from "../sections/CTASection";
import { supabase } from "@/lib/supabase";

interface Alumni {
  name: string
  role: string
  image: string
  batch: string
}

export default function Home() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);

  useEffect(() => {
    async function fetchSpotlight() {
      try {
        const { data, error } = await supabase
          .from('batch_members')
          .select('name, job_title, profile_image_url, batch')
          .limit(50); // Fetch up to 50 for shuffling

        if (error) throw error;

        if (data) {
          const formatted = data.map(m => ({
            name: m.name,
            role: m.job_title || "Member",
            image: m.profile_image_url || "", // Let component handle fallback
            batch: m.batch
          }));
          
          // Shuffle and pick 10
          const shuffled = formatted.sort(() => 0.5 - Math.random()).slice(0, 10);
          setAlumni(shuffled);
        }
      } catch (err) {
        console.error("Error fetching spotlight alumni:", err);
      }
    }

    fetchSpotlight();
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FestSection />
      <AlumniSpotlightSection alumni={alumni} />
      <MemoryQuoteSection />
      <CTASection />
    </main>
  );
}