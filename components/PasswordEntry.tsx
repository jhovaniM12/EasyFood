import React from "react";
import { LockKeyhole } from "lucide-react";

interface PasswordEntryProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordEntry({ value, onChange }: PasswordEntryProps) {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <label className="text-xs font-bold text-amber-900 tracking-wide">CONTRASEÑA</label>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 w-full">
        <div className="flex items-center gap-3 w-full">
          <LockKeyhole className="text-amber-800/50" size={20} />

          <input
            type="password"
            placeholder="********"
            className="w-full flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
