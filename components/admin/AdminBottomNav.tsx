"use client";
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { ClipboardList, Package, UserRoundPen } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // EL COLOR QUE SOLICITASTE
  const customRed = "#E53935"; 
  const inactiveColor = "#A0A0A0";

  return (
    <Paper elevation={0} 
      sx={{ 
        position: 'absolute', 
        bottom: 0, left: 0, right: 0, 
        zIndex: 1000,
        borderRadius: '24px 24px 0 0',
        overflow: 'hidden',
        borderTop: '1px solid #F0F0F0'
      }}
    >
      <BottomNavigation
        showLabels
        value={pathname}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') router.push(newValue);
        }}
        sx={{ 
          height: 75,
          // CAMBIA EL COLOR DEL TEXTO CUANDO ESTÁ SELECCIONADO
          '& .Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              color: customRed,
              fontWeight: 800,
              fontSize: '0.75rem'
            }
          },
          // COLOR DEL TEXTO NO SELECCIONADO
          '& .MuiBottomNavigationAction-label': {
            color: inactiveColor,
            fontSize: '0.7rem'
          }
        }}
        >
          <BottomNavigationAction
            label="Pedidos"
            value="/admin/order"
            icon={<ClipboardList color={pathname === '/admin/order' ? customRed : inactiveColor} size={22} />}
          />
          <BottomNavigationAction
            label="Inventario"
            value="/admin/Inventory"
            icon={<Package color={pathname === '/admin/Inventory' ? customRed : inactiveColor} size={22} />}
          />
          <BottomNavigationAction
            label="Perfil"
            value="/admin/profileAdmin"
            icon={<UserRoundPen color={pathname === '/admin/profileAdmin' ? customRed : inactiveColor} size={22} />}
          />
      </BottomNavigation>
    </Paper>
  );
}