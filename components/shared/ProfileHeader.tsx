// components/profile/ProfileHeader.tsx
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { ChevronLeft, Pencil } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  role: string;
  code: string;
  avatarUrl?: string;
  onBack?: () => void;
  onEdit?: () => void;
}

export const ProfileHeader = ({ 
  name, 
  role, 
  code, 
  avatarUrl, 
  onBack, 
  onEdit 
}: ProfileHeaderProps) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>

      {/* 2. Tarjeta Blanca de Información */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderRadius: 6, 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        position: 'relative'
      }}>
        <Avatar 
          src={avatarUrl} 
          sx={{ 
            width: 70, 
            height: 70, 
            mr: 2,
            border: '2px solid #FFEBEA' 
          }} 
        />
        
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: '#2D3142', lineHeight: 1.2 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#9DA3B4', fontWeight: 600, mt: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {role}
          </Typography>
        </Box>

        <IconButton 
          onClick={onEdit}
          sx={{ 
            color: '#D94E41', 
            bgcolor: '#FAFAFA',
            '&:hover': { bgcolor: '#FFEBEA' }
          }}
        >
          <Pencil size={20} />
        </IconButton>
      </Box>

      {/* 3. Badge del Código (Flotando abajo) */}
      <Box sx={{ display: 'flex', justifyContent: 'center',position: 'relative', zIndex: 3, mt: -0.1 }}>
        <Box sx={{ 
          bgcolor: '#FFEBEA', 
          px: 3, 
          py: 0.8, 
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(217, 78, 65, 0.1)'
        }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#D94E41' }}>
            CÓDIGO: <span style={{ color: '#D94E41' }}>{code}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};