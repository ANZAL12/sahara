"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter, Heart } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Alumni", href: "/alumni" },
      { name: "Events", href: "/events" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Batches", href: "/batches" },
      { name: "Festivities", href: "/fest" },
      { name: "Members", href: "/members" },
      { name: "Join Us", href: "/batches/join" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Twitter, href: "#", name: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#4A5D4E] pt-32 pb-10 overflow-hidden border-t border-[#dcd8d0]">
      {/* Decorative Scrapbook Elements - Lightened for dark bg */}
      <div className="absolute top-0 left-10 w-32 h-32 bg-[url('/memories/Acer_Wallpaper_01_3840x2400.jpg')] bg-cover opacity-[0.03] rotate-12 pointer-events-none invert" />
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-[url('/image.png')] bg-cover opacity-[0.03] -rotate-6 pointer-events-none invert" />
      
      {/* Paper Texture Overlay (Dark Mode version) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex flex-col">
                <span className="text-4xl font-serif font-bold text-[#F9F6F0] tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                  Sahara
                </span>
                <span className="text-lg font-marker text-[#bb8d62] -mt-1 transform -rotate-1 ml-6 group-hover:rotate-0 transition-transform">
                  Connect
                </span>
              </div>
            </Link>
            <p className="text-[#F9F6F0]/80 font-serif italic text-xl leading-relaxed max-w-xs">
              &quot;A place where memories stay and new stories begin.&quot;
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#F9F6F0]/60 hover:text-[#bb8d62] transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full border border-[#F9F6F0]/10 flex items-center justify-center group-hover:border-[#bb8d62]/30">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-serif italic">hello@saharaconnect.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#F9F6F0]/60 hover:text-[#bb8d62] transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full border border-[#F9F6F0]/10 flex items-center justify-center group-hover:border-[#bb8d62]/30">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-serif italic">+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex gap-5">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -5, backgroundColor: "rgba(249, 246, 240, 0.1)" }}
                  className="w-12 h-12 rounded-full border border-[#F9F6F0]/20 flex items-center justify-center text-[#F9F6F0]/90 transition-all hover:border-[#F9F6F0]/40"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.title} className="space-y-8">
              <h3 className="text-[#bb8d62] font-bold uppercase tracking-[0.2em] text-sm">
                {column.title}
              </h3>
              <ul className="space-y-5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#F9F6F0]/70 hover:text-[#F9F6F0] transition-colors text-lg font-serif italic inline-block"
                    >
                      <motion.span whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column - Signature Ledger Style */}
          <div className="space-y-6 bg-[#F9F6F0]/5 backdrop-blur-md p-8 rounded-sm border border-[#F9F6F0]/10 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <h3 className="text-[#bb8d62] font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-2">
              Sign the Ledger
              <svg className="w-4 h-4 text-[#bb8d62] opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </h3>
            <p className="text-[#F9F6F0]/70 text-sm font-serif italic mb-4">
              Leave your mark. Join our inner circle for exclusive alumni updates and early invites.
            </p>
            <form className="mt-4 relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your preferred email address..." 
                className="w-full bg-transparent border-0 border-b-2 border-[#bb8d62]/50 text-[#F9F6F0] font-caveat text-xl py-2 px-1 focus:ring-0 focus:outline-none focus:border-[#bb8d62] transition-colors placeholder:font-serif placeholder:italic placeholder:text-sm placeholder:text-[#F9F6F0]/30"
                required
              />
              <motion.button 
                whileHover={{ scale: 1.05, color: "#bb8d62" }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="absolute right-0 bottom-2 text-[#F9F6F0]/70 hover:text-[#bb8d62] transition-colors"
                aria-label="Submit signature"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </motion.button>
            </form>
            <div className="absolute -bottom-6 -right-6 text-[8rem] font-old-english text-[#F9F6F0]/5 opacity-10 pointer-events-none rotate-12">
              S
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[#F9F6F0]/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[#F9F6F0]/40 text-sm font-serif italic">
            © {new Date().getFullYear()} Sahara Connect. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[#F9F6F0]/60 text-sm italic font-serif group">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-[#bb8d62] fill-[#bb8d62] group-hover:scale-125 transition-transform" />
            <span>by the Sahara Alumni Community</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
