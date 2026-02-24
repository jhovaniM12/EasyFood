
export interface CartItemType {
    id: number;
    name: string;
    description: string;
    price: number;        // valor numérico para calcular subtotal
    priceLabel: string;   // texto formateado "$12.500"
    image: string;
    quantity: number;
}

export const initialCartItems: CartItemType[] = [
    {
        id: 1,
        name: "Hamburguesa especial UAO",
        description: "Queso extra, sin cebolla",
        price: 12500,
        priceLabel: "$12.500",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
        quantity: 1,
    },
];

export const pickupPoints = [
    { id: "restaurante", label: "Restaurante ...", waitTime: "10 minutos de espera", icon: "store" },
    { id: "cafeteria", label: "Cafetería piso 3", waitTime: "10 minutos de espera", icon: "utensils" },
];
