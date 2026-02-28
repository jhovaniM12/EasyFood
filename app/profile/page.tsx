"use client";

import { Box, Typography, Switch } from '@mui/material';
import { User, CreditCard, ShoppingBag, LogOut, Tag, Fingerprint, Lock } from 'lucide-react';
import { MenuOption } from '@/components/shared/MenuOption';
import { ActionButton } from '@/components/shared/ActionButton';
import { ProfileHeader } from '@/components/shared/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 3, backgroundColor: '#FDF4ED' }}>
      <ProfileHeader
        name={user?.nombre ?? ""}
        role={`${user?.rol === "estudiante" ? "Estudiante" : "Colaborador"} — ${user?.carrera ?? ""}`}
        code={user?.codigoInstitucional ?? ""}
        avatarUrl="/tu-imagen.png"
        onBack={() => window.history.back()}
      />

      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>Personal</Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
        <MenuOption icon={<User size={20} />} label="Mis Datos" onClick={() => { }} />
        <MenuOption icon={<CreditCard size={20} />} label="Métodos de Pago" onClick={() => { }} />
      </Box>

      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>Notificaciones</Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
        <MenuOption icon={<ShoppingBag size={20} />} label="Pedidos" rightElement={<Switch defaultChecked color="error" />} />
        <MenuOption icon={<Tag size={20} />} label="Promociones" rightElement={<Switch color="error" />} />
      </Box>

      <Typography variant="overline" sx={{ color: '#9DA3B4', fontWeight: 'bold', ml: 1 }}>Privacidad y Seguridad</Typography>
      <Box sx={{ bgcolor: 'white', borderRadius: 4, mb: 3, overflow: 'hidden' }}>
        <MenuOption icon={<Lock size={20} />} label="Cambiar Contraseña" onClick={() => { }} />
        <MenuOption icon={<Fingerprint size={20} />} label="Biometría/FaceID" rightElement={<Switch defaultChecked color="error" />} />
      </Box>

      <ActionButton label="Cerrar Sesión" icon={<LogOut size={20} />} variant="danger" onClick={logout} />
    </Box>
  );
}