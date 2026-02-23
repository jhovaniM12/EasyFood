
"use client";

import { User } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-[#FAFAFA]">
            <div className="bg-[#7c3f1c] p-4 rounded-full mb-4">
                <User size={48} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-[#7c3f1c]">Mi Perfil</h1>
            <p className="text-gray-500">Configura tu cuenta y preferencias.</p>
        </div>
    );
}
