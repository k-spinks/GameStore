import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavMenu from './components/NavBarMenu';

function App() {
  return (
    <>
      <NavMenu />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
