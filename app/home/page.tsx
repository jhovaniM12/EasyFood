"use client";
import ButtonComponent from "@/components/shared/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#FAFAFA]">
      <h1 className="text-2xl font-bold text-[#7c3f1c]">¡Bienvenido a EasyFood!</h1>
      <p className="text-gray-500">Aquí verás tu menú del día.</p>
      <ButtonComponent text="Iniciar Sesión" />
    </div>
  );
}