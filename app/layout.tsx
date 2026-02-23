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
      <body className="antialiased layout-bg h-screen overflow-hidden pt-[0.1px]">
        <div className="mobile-layout h-screen relative flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-16">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
