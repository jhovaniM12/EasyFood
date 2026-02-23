
"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, ShoppingBasket, History, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function SimpleBottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();

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

    return (
        <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    router.push(routes[newValue]);
                }}
            >
                <BottomNavigationAction label="Inicio" icon={<Home size={20} />} />
                <BottomNavigationAction label="Carrito" icon={<ShoppingBasket size={20} />} />
                <BottomNavigationAction label="Historial" icon={<History size={20} />} />
                <BottomNavigationAction label="Perfil" icon={<User size={20} />} />
            </BottomNavigation>
        </Box>
    );
}
