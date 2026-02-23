import React from "react";
import { UserRound } from "lucide-react";

interface StudentCodeInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StudentCodeInput({ value, onChange }: StudentCodeInputProps) {
  return (
    /* 1. w-full asegura que el grupo ocupe todo el ancho del formulario */
    <div className="flex flex-col gap-2 w-full mb-4">
      
      <label className="text-xs font-bold text-amber-900 tracking-wide">
        CÓDIGO ESTUDIANTE/COLABORADOR
      </label>

      {/* 2. Contenedor blanco (la tarjeta) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full">
        
        {/* 3. Wrapper flex para alinear icono + input */}
        <div className="flex items-center gap-3 w-full">
          
          <UserRound className="text-amber-800/50" size={20} />
          
          <input
            type="text"
            placeholder="Ej: 2205432"
            /* w-full: lo hace ancho
               flex-1: le dice que use todo el espacio sobrante a la derecha del icono
               outline-none: quita el borde azul feo al hacer click
            */
            className="w-full flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            value={value}
            onChange={onChange}
          />
          
        </div>
      </div>
    </div>
  );
}

