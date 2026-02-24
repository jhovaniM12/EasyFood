import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/shared/BottomNav";
import MainContent from "@/components/shared/MainContent";

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
      <body className="antialiased layout-bg overflow-hidden" style={{ height: '100dvh' }}>
        <div className="mobile-layout relative flex flex-col overflow-hidden" style={{ height: '100dvh' }}>
          <MainContent>{children}</MainContent>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
