"use client";

export default function HistoryPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-[#FDF4ED] gap-3 px-8">
            <span className="text-5xl">📋</span>
            <h1 className="text-xl font-extrabold text-gray-900">Historial</h1>
            <p className="text-sm text-gray-400 text-center">
                Aquí aparecerán tus pedidos anteriores.
            </p>
        </div>
    );
}
