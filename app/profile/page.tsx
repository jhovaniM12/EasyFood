"use client";

import { Box, Typography, Switch } from '@mui/material';
import { User, CreditCard, ShoppingBag, LogOut, Tag, Fingerprint } from 'lucide-react';
import { MenuOption } from '@/components/shared/MenuOption';
import { ActionButton } from '@/components/shared/ActionButton';
import { ProfileHeader } from '@/components/shared/ProfileHeader';
import { Lock } from 'lucide-react';

export default function ProfilePage() {
  return (
    <Box sx={{ p: 3, backgroundColor: '#FAFAFA ' }}>
      <ProfileHeader 
        name="Mateo Arias"
        role="Estudiante - Ingeniería Informática"
        code="2205123"
        avatarUrl="/tu-imagen.png" // Opcional
        onBack={() => window.history.back()}
      />
      {/* Sección Personal */}
      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>
        Personal
      </Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
        <MenuOption 
          icon={<User size={20} />} 
          label="Mis Datos" 
          onClick={() => console.log("Ir a datos")} 
        />
        <MenuOption 
          icon={<CreditCard size={20} />} 
          label="Métodos de Pago" 
          onClick={() => {}} 
        />
      </Box>

      {/* Sección Notificaciones */}
      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>
        Notificaciones
      </Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
        <MenuOption 
        icon={<ShoppingBag size={20} />} 
        label="Pedidos" 
        rightElement={<Switch defaultChecked color="error" />} 
      />
      <MenuOption 
        icon={<Tag size={20} />} 
        label="Promociones" 
        rightElement={<Switch color="error" />} 
      />
      </Box>

      {/* Sección Privacidad y seguridad */}
      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>
        Privacidad y Seguridad
      </Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
            
      {/* Opción: Cambiar Contraseña */}
      <MenuOption 
        icon={<Lock size={20} />} 
        label="Cambiar Contraseña" 
        onClick={() => console.log("Navegar a cambio de pass")} 
      />

      {/* Opción: Biometría / FaceID */}
      <MenuOption 
        icon={<Fingerprint size={20} />} 
        label="Biometría/FaceID"
        rightElement={<Switch defaultChecked color="error" />} 
      />
      </Box>

      {/* Botón de Cerrar Sesión */}
      <ActionButton 
        label="Cerrar Sesión" 
        icon={<LogOut size={20} />} 
        variant="danger"
        onClick={() => alert("Sesión cerrada")}
      />
    </Box>
  );
}