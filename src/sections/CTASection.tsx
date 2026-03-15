"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Globe, Users, GraduationCap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function CTASection() {
  const [stats, setStats] = useState({
    members: 0,
    batches: 0,
    countries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from('batch_members')
          .select('batch, country');

        if (error) throw error;

        if (data) {
          const uniqueBatches = new Set(data.map(m => m.batch).filter(Boolean));
          const uniqueCountries = new Set(data.map(m => m.country).filter(Boolean));

          setStats({
            members: data.length,
            batches: uniqueBatches.size,
            countries: uniqueCountries.size,
          });
        }
      } catch (err) {
        console.error("Error fetching CTA stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <Section className="bg-[#4A5D4E] relative overflow-hidden text-[#F9F6F0]">
      {/* Decorative background paper texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-10 pointer-events-none" />

      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bb8d62]/10 blur-[150px] pointer-events-none" />

      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F9F6F0]/10 border border-[#F9F6F0]/20 text-[#bb8d62] text-xs uppercase tracking-widest font-semibold mb-8">
            <Users className="w-3.5 h-3.5" />
            Join Our Global Community
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#F9F6F0] mb-8 tracking-tight">
            Ready to <span className="italic">Reconnect?</span>
          </h2>

          <p className="text-xl text-[#F9F6F0]/80 mb-12 max-w-2xl mx-auto leading-relaxed font-serif italic">
            Join thousands of Saharians who are already part of this growing community.
            Whether you&apos;re looking to network, share memories, or contribute to our events,
            Sahara Connect is your home away from home.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/batches/join"
                className="inline-block bg-[#bb8d62] hover:bg-[#a67c55] text-white font-medium px-12 py-5 text-lg rounded-md transition-all duration-300 shadow-xl"
              >
                Become a Member
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="col-span-1 md:col-span-3 flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#bb8d62]/50" />
            </div>
          ) : (
            <>
              <motion.div
                className="p-10 text-center group border border-[#F9F6F0]/10 bg-white/5 backdrop-blur-sm rounded-sm hover:border-[#F9F6F0]/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl font-serif font-bold text-[#F9F6F0] mb-3 group-hover:text-[#bb8d62] transition-colors duration-500">
                  {stats.members.toLocaleString()}+
                </div>
                <div className="text-[#F9F6F0]/40 font-serif italic tracking-wider text-sm">Active Members</div>
              </motion.div>

              <motion.div
                className="p-10 text-center group border border-[#F9F6F0]/10 bg-white/5 backdrop-blur-sm rounded-sm hover:border-[#F9F6F0]/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl font-serif font-bold text-[#F9F6F0] mb-3 group-hover:text-[#bb8d62] transition-colors duration-500">
                  {stats.batches}+
                </div>
                <div className="text-[#F9F6F0]/40 font-serif italic tracking-wider text-sm">Batches Connected</div>
              </motion.div>

              <motion.div
                className="p-10 text-center group border border-[#F9F6F0]/10 bg-white/5 backdrop-blur-sm rounded-sm hover:border-[#F9F6F0]/20 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl font-serif font-bold text-[#F9F6F0] mb-3 group-hover:text-[#bb8d62] transition-colors duration-500">
                  {stats.countries}+
                </div>
                <div className="text-[#F9F6F0]/40 font-serif italic tracking-wider text-sm">Countries Reached</div>
              </motion.div>
            </>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}