"use client";
import React from "react";
import { Box, Typography, Avatar, IconButton, Switch, ListItem, ListItemText, ListItemIcon, Divider, Paper, ListItemButton } from "@mui/material";
import { ChevronRight, User, CreditCard, Bell, Tag, Lock, Fingerprint, Pencil } from "lucide-react";
import AdminBottomNav from "@/components/admin/AdminBottomNav";

export default function AdminProfilePage() {
  return (
    /* CONTENEDOR 1: Fondo gris del navegador para centrar la app */
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
              <Avatar sx={{ width: 70, height: 70, bgcolor: '#F5F5F5' }}>
                <User color="#A0A0A0" size={35} />
              </Avatar>
              <IconButton 
                size="small" 
                sx={{ 
                  position: 'absolute', 
                  bottom: -5, 
                  right: -5, 
                  bgcolor: 'white', 
                  boxShadow: 2, 
                  p: 0.5,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <Pencil size={14} color="#D94E41" />
              </IconButton>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: '#2D3142' }}>
                COLABORADOR —
              </Typography> 
              <Box sx={{ 
                mt: 0.5, 
                px: 1.5, 
                py: 0.4, 
                bgcolor: '#FFF2F1', 
                borderRadius: '20px', 
                display: 'inline-block' 
              }}>
                <Typography sx={{ color: '#D94E41', fontWeight: 900, fontSize: '0.65rem', letterSpacing: 0.5 }}>
                  CÓDIGO:
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
          
        </Box>

        {/* BARRA DE NAVEGACIÓN INFERIOR (ANCLADA AL CELULAR) */}
        <AdminBottomNav />

      </Box>
   
  );
}

// --- COMPONENTES AUXILIARES ---

function ProfileSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ 
        fontSize: '0.75rem', 
        fontWeight: 900, 
        color: '#A0A0A0', 
        mb: 1.5, 
        ml: 2, 
        letterSpacing: 1.2 
      }}>
        {title}
      </Typography>
      <Paper elevation={0} sx={{ borderRadius: '24px', overflow: 'hidden', bgcolor: 'white' }}>
        {children}
      </Paper>
    </Box>
  );
}

function MenuAction({ icon, label }: { icon: any, label: string }) {
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

function MenuSwitch({ icon, label, defaultChecked = false }: { icon: any, label: string, defaultChecked?: boolean }) {
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