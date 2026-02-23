import type { Metadata } from "next";
import "./globals.css";

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
        <div className="mobile-layout h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
