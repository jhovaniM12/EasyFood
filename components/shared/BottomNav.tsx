
"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, ShoppingCart, ClipboardClock, UserRoundPen } from 'lucide-react';
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
        <Box sx={{ width: '100%', position: 'relative', bottom: 0, left: 0, right: 0, zIndex: 10}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    router.push(routes[newValue]);
                }}
                sx={{
                    // Color de la pestaña seleccionada
                    '& .Mui-selected': {
                    color: '#7c3f1c', // El color terracota/cafe de tu logo
                    },
                    // Color de los iconos seleccionados específicamente
                    '& .Mui-selected .MuiBottomNavigationAction-icon': {
                    color: '#7c3f1c',
                    },
                }}
                
                
            >
                <BottomNavigationAction label="Inicio" icon={<Home size={20} />} />
                <BottomNavigationAction label="Carrito" icon={<ShoppingCart size={20} />} />
                <BottomNavigationAction label="Historial" icon={<ClipboardClock size={20} />} />
                <BottomNavigationAction label="Perfil" icon={<UserRoundPen size={20} />} />
            </BottomNavigation>
        </Box>
    );
}
