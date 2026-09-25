import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import theme from './theme/themes';
import App from './App';
import Home from './pages/Home';
import EditGame from './pages/EditGame';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="editgame" element={<EditGame />} />
              <Route path="editgame/:id" element={<EditGame />} />
            </Route>
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);
