"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Add points to trail, throttling slightly to avoid too many DOM elements
      const now = Date.now();
      if (now - lastTime > 30) { 
        setTrail((prev) => [
          ...prev,
          { x: e.clientX, y: e.clientY, id: now },
        ].slice(-15)); // Keep last 15 points for the trail
        lastTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Fade out trail over time
    const fadeTrail = () => {
      setTrail((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1);
      });
      animationFrameId = requestAnimationFrame(fadeTrail);
    };
    
    // Slower fade interval
    const intervalId = setInterval(fadeTrail, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body, a, button, .cursor-pointer { cursor: none !important; }
      ` }} />
      
      {isVisible && (
        <>
          {/* Ink Trail */}
          {trail.map((point, index) => {
            // Calculate opacity and scale based on index (older points are smaller/more faded)
            const progress = index / trail.length;
            
            return (
              <motion.div
                key={point.id}
                className="fixed top-0 left-0 rounded-full bg-[#bb8d62] pointer-events-none z-[9998] translate-x-[-50%] translate-y-[-50%]"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  x: point.x,
                  y: point.y,
                  width: 8 * progress,
                  height: 8 * progress,
                }}
              />
            );
          })}

          {/* Main Cursor spotlight/revealer */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center translate-x-[-50%] translate-y-[-50%] mix-blend-difference"
            style={{ x: cursorX, y: cursorY }}
          >
            {/* Spotlight Circle */}
            <motion.div
              className="absolute rounded-full bg-white backdrop-invert"
              animate={{
                width: isHovering ? 60 : 25,
                height: isHovering ? 60 : 25,
                opacity: isHovering ? 0.9 : 0.7,
                scale: isHovering ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Central Dot */}
            <motion.div
              className="absolute rounded-full bg-black"
              animate={{
                width: isHovering ? 0 : 4,
                height: isHovering ? 0 : 4,
                opacity: isHovering ? 0 : 1,
              }}
            />
          </motion.div>
        </>
      )}
    </>
  );
}
