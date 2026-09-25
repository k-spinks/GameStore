import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#14161A',
      paper: '#1E2128',
    },
    text: {
      primary: '#F5F5F0',
      secondary: '#8A8F98',
    },
    primary: {
      main: '#7FE07A',
      contrastText: '#14161A',
    },
    error: {
      main: '#E0574A',
    },
    divider: '#2A2E36',
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif' },
    h2: { fontFamily: '"Space Grotesk", sans-serif' },
    h3: { fontFamily: '"Space Grotesk", sans-serif' },
    h4: { fontFamily: '"Space Grotesk", sans-serif' },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: 0.2,
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2128',
          backgroundImage: 'none',
          borderBottom: '1px solid #2A2E36',
          color: '#F5F5F0',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: '#1E2128',
            color: '#F5F5F0',
            fontWeight: 700,
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.8rem',
            letterSpacing: 0.3,
            borderBottom: '2px solid #2A2E36',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(127, 224, 122, 0.06)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #22252C',
          fontVariantNumeric: 'tabular-nums',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
