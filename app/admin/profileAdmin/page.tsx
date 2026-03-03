"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton, Switch, ListItem, ListItemText, ListItemIcon, Divider, Paper, ListItemButton, CircularProgress, Button } from "@mui/material";
import { ChevronRight, User, CreditCard, Bell, Tag, Lock, Fingerprint, Pencil, LogOut } from "lucide-react";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { adminService, AdminProfile } from "@/services/admin/AdminService";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    adminService.getProfile()
      .then(({ data }) => setProfile(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#FDF4ED", minHeight: "100dvh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#E53935" }} />
      </Box>
    );
  }

  const rolDisplay = profile?.rol === "admin" ? "ADMINISTRADOR" : "COLABORADOR";
  const restaurantDisplay = profile?.restauranteNombre ?? "Sin asignar";

  return (
    <Box sx={{
      bgcolor: "#FDF4ED",
      minHeight: "92vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: { xs: 0, sm: 2 }
    }}>
      {/* CONTENIDO CON SCROLL */}
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 3,
        pb: 12,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>

        {/* TARJETA SUPERIOR DE PERFIL */}
        <Paper elevation={0} sx={{
          p: 3,
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          bgcolor: 'white'
        }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profile?.fotoUrl ?? undefined}
              sx={{ width: 70, height: 70, bgcolor: '#F5F5F5' }}
            >
              {!profile?.fotoUrl && <User color="#A0A0A0" size={35} />}
            </Avatar>
            <IconButton
              size="small"
              sx={{
                position: 'absolute', bottom: -5, right: -5,
                bgcolor: 'white', boxShadow: 2, p: 0.5,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <Pencil size={14} color="#D94E41" />
            </IconButton>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: '#2D3142' }}>
              {profile?.nombre ?? "—"}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#9DA3B4', fontWeight: 600 }}>
              {restaurantDisplay}
            </Typography>
            <Box sx={{
              mt: 0.5, px: 1.5, py: 0.4,
              bgcolor: '#FFF2F1', borderRadius: '20px',
              display: 'inline-block'
            }}>
              <Typography sx={{ color: '#D94E41', fontWeight: 900, fontSize: '0.65rem', letterSpacing: 0.5 }}>
                {rolDisplay} — {profile?.codigoInstitucional}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* SECCIONES DEL MENÚ */}
        <ProfileSection title="PERSONAL">
          <MenuAction icon={<User size={18} />} label="Mis Datos" />
          <Divider variant="middle" sx={{ opacity: 0.5 }} />
          <MenuAction icon={<CreditCard size={18} />} label="Métodos de Pago" />
        </ProfileSection>

        <ProfileSection title="NOTIFICACIONES">
          <MenuSwitch icon={<Bell size={18} />} label="Pedidos" defaultChecked />
          <Divider variant="middle" sx={{ opacity: 0.5 }} />
          <MenuSwitch icon={<Tag size={18} />} label="Promociones" />
        </ProfileSection>

        <ProfileSection title="PRIVACIDAD Y SEGURIDAD">
          <MenuAction icon={<Lock size={18} />} label="Cambiar Contraseña" />
          <Divider variant="middle" sx={{ opacity: 0.5 }} />
          <MenuSwitch icon={<Fingerprint size={18} />} label="Biometría/FaceID" defaultChecked />
        </ProfileSection>

        {/* BOTÓN CERRAR SESIÓN */}
        <Button
          fullWidth
          onClick={logout}
          startIcon={<LogOut size={18} />}
          sx={{
            mt: 1,
            mb: 4,
            py: 1.8,
            borderRadius: '24px',
            bgcolor: 'white',
            color: '#E53935',
            fontWeight: 800,
            fontSize: '0.9rem',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            '&:hover': { bgcolor: '#FFF2F1' },
          }}
        >
          Cerrar Sesión
        </Button>

      </Box>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <AdminBottomNav />
    </Box>
  );
}

// --- COMPONENTES AUXILIARES ---

function ProfileSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{
        fontSize: '0.75rem', fontWeight: 900, color: '#A0A0A0',
        mb: 1.5, ml: 2, letterSpacing: 1.2
      }}>
        {title}
      </Typography>
      <Paper elevation={0} sx={{ borderRadius: '24px', overflow: 'hidden', bgcolor: 'white' }}>
        {children}
      </Paper>
    </Box>
  );
}

function MenuAction({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ py: 2, px: 2.5 }}>
        <ListItemIcon sx={{ color: '#D94E41', minWidth: 40 }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem', color: '#2D3142' }}
        />
        <ChevronRight size={18} color="#D0D0D0" />
      </ListItemButton>
    </ListItem>
  );
}

function MenuSwitch({ icon, label, defaultChecked = false }: { icon: React.ReactNode, label: string, defaultChecked?: boolean }) {
  return (
    <ListItem
      sx={{ py: 1.2, px: 2.5 }}
      secondaryAction={
        <Switch
          edge="end"
          defaultChecked={defaultChecked}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: '#D94E41' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D94E41' }
          }}
        />
      }
    >
      <ListItemIcon sx={{ color: '#D94E41', minWidth: 40 }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem', color: '#2D3142' }}
      />
    </ListItem>
  );
}