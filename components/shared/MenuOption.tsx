// components/shared/MenuOption.tsx
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface MenuOptionProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  rightElement?: ReactNode; // Por si quieres pasar un Switch o un Badge
  showArrow?: boolean;
}

export const MenuOption = ({ icon, label, onClick, rightElement, showArrow = true }: MenuOptionProps) => {
  return (
    <>
      <ListItem 
        component="div" 
        onClick={onClick}
        sx={{ 
          py: 2, 
          cursor: onClick ? 'pointer' : 'default',
          '&:active': { bgcolor: onClick ? 'rgba(0,0,0,0.02)' : 'transparent' }
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: '#D94E41' }}>
          {icon}
        </ListItemIcon>
        <ListItemText 
          primary={label} 
          primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color: '#2D3142' }} 
        />
        {rightElement}
        {showArrow && !rightElement && <ChevronRight size={18} color="#9DA3B4" />}
      </ListItem>
      <Divider variant="middle" sx={{ opacity: 0.5 }} />
    </>
  );
};