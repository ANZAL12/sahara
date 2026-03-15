"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Cursor from "@/components/ui/Cursor";
import Footer from "@/components/layout/Footer";

const Ribbons = dynamic(() => import("@/components/ui/Ribbons"), {
  ssr: false,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminDashboard = pathname?.startsWith("/admin") && pathname !== "/admin/login";

    return (
        <>
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Ribbons
                  colors={['#6b8e73', '#bb8d62', '#8b5e3c', '#4A5D4E', '#dcd8d0']}
                  baseSpring={0.02}
                  baseFriction={0.9}
                  baseThickness={25}
                  offsetFactor={0.06}
                  maxAge={600}
                  pointCount={60}
                  speedMultiplier={0.5}
                  enableFade={true}
                  enableShaderEffect={true}
                  effectAmplitude={1.5}
                  backgroundColor={[0, 0, 0, 0]} /* Transparent bg to let globals.css color show through */
                />
            </div>
            {/* Global paper texture overlay */}
            <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.4] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
            <div className="relative z-10 min-h-screen flex flex-col">
                {!isAdminDashboard && <Navbar />}
                <main className="flex-grow">
                    {children}
                </main>
                {!isAdminDashboard && <Footer />}
            </div>
            <Cursor />
        </>
    );
}
