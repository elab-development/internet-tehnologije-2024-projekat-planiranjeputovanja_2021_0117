// src/components/Button.jsx
import React from 'react';
import MuiButton from '@mui/material/Button';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  type = 'button',
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: 3,
        boxShadow: 3,
        textTransform: 'none',
        fontWeight: 600,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-1px)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
