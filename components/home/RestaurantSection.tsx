import { MapPin } from "lucide-react";

interface RestaurantSectionProps {
    name: string;
    location: string;
    children: React.ReactNode;
    showLocation?: boolean;
}

export default function RestaurantSection({
    name,
    location,
    children,
    showLocation = true,
}: RestaurantSectionProps) {
    return (
        <section className="px-4 mt-5">
            {/* Encabezado */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                    {showLocation && (
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                            <MapPin size={11} />
                            <span>{location}</span>
                        </div>
                    )}
                </div>
                <button className="text-[#E53935] text-xs font-semibold mt-1 hover:underline">
                    Ver más
                </button>
            </div>

            {/* Contenido */}
            {children}
        </section>
    );
}


