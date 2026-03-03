
"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiBadge from '@mui/material/Badge';
import { Home, ShoppingCart, ClipboardClock, UserRoundPen } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';



export default function SimpleBottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const { totalItems } = useCart();

    // Mapeamos las rutas a índices para que el componente de MUI sepa cuál está activo
    const routes = ['/home', '/shopping', '/history', '/profile'];
    const [value, setValue] = React.useState(routes.indexOf(pathname));
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        setValue(routes.indexOf(pathname));
    }, [pathname]);

    // Evita el renderizado en el servidor para prevenir errores de hidratación
    if (!mounted) {
        return null;
    }

    // No mostrar el navbar en la página de login ni en rutas admin
    if (pathname === '/' || pathname.startsWith('/admin')) {
        return null;
    }

    const cartIcon = (
        <MuiBadge
            badgeContent={totalItems || undefined}
            sx={{ "& .MuiBadge-badge": { backgroundColor: "#E53935", color: "#fff", fontSize: "0.6rem", minWidth: 16, height: 16 } }}
        >
            <ShoppingCart size={20} />
        </MuiBadge>
    );

    return (
        <Box sx={{ width: '100%', flexShrink: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    router.push(routes[newValue]);
                }}
                sx={{
                    "& .MuiBottomNavigationAction-root": {
                        color: "#9CA3AF",
                    },
                    "& .MuiBottomNavigationAction-root.Mui-selected": {
                        color: "#E53935",
                        "& .MuiBottomNavigationAction-label": {
                            fontWeight: "bold",
                        },
                    },
                }}
            >
                <BottomNavigationAction label="Inicio" icon={<Home size={20} />} />
                <BottomNavigationAction label="Carrito" icon={cartIcon} />
                <BottomNavigationAction label="Historial" icon={<ClipboardClock size={20} />} />
                <BottomNavigationAction label="Perfil" icon={<UserRoundPen size={20} />} />
            </BottomNavigation>
        </Box>
    );
}
