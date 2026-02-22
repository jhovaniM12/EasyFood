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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
