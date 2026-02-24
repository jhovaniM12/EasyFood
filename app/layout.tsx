import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/shared/BottomNav";

export const metadata: Metadata = {
  title: "EasyFood",
  description: "La mejor plataforma para gestionar tu comida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased layout-bg h-screen overflow-hidden flex items-center justify-center ">
        <div className="mobile-layout h-screen relative flex flex-col overflow-hidden mx-auto">
          <main className="flex-1 overflow-y-auto overscroll-none">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
