"use client";

import ButtonComponent from "@/components/shared/button";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const handleLogin = () => {
    setCount(count + 1);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4">
      <h1>PAGINA DE LOGIN 😊</h1>
      <ButtonComponent text="Iniciar Sesión" onClick={handleLogin} disabled={false} type="button" />
      <p>Contador: {count}</p>
    </div>
  );
}
