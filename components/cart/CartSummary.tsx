interface CartSummaryProps {
    subtotal: number;
}

function formatCOP(value: number) {
    return "$" + value.toLocaleString("es-CO");
}

export default function CartSummary({ subtotal }: CartSummaryProps) {
    return (
        <div className="px-4 mt-6 flex items-center justify-between">
            <span className="text-base font-extrabold text-gray-900 tracking-wide">SUBTOTAL:</span>
            <span className="text-xl font-extrabold text-[#E53935]">{formatCOP(subtotal)}</span>
        </div>
    );
}
