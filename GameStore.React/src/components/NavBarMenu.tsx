import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavMenu: React.FC = () => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Game Store
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
