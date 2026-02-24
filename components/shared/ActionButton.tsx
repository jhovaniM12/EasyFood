// components/shared/ActionButton.tsx
import { Button } from '@mui/material';
import { ReactNode } from 'react';

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: 'danger' | 'primary';
}

export const ActionButton = ({ label, icon, onClick, variant = 'primary' }: ActionButtonProps) => {
  const isDanger = variant === 'danger';

  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      sx={{
        py: 2,
        borderRadius: 4,
        textTransform: 'none',
        fontWeight: 'bold',
        boxShadow: 'none',
        // Estilos dinámicos
        backgroundColor: isDanger ? '#FFEBEA' : '#D94E41',
        color: isDanger ? '#D94E41' : '#FFFFFF',
        '&:hover': {
          backgroundColor: isDanger ? '#FFDBD8' : '#B83D33',
          boxShadow: 'none',
        }
      }}
    >
      {label}
    </Button>
  );
};