import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import CardCreatorPage from './pages/CardCreator';
import CatalogPage from './pages/Catalog';
import RandomCardPage from './pages/RandomCard';

export default function App() {
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const navItems = ['Card Generator', 'Catalog', 'Random Card'];

  return (
    <>
      <AppBar position="static" component="nav">
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {
              navItems
                .filter((_, index) => index == activePageIndex)
                .map(text => text)
            }
          </Typography>
          <Box>
            {
              navItems.map((item, index) => (
                <Button key={item} sx={{ color: '#fff' }} onClick={() => setActivePageIndex(index)}>
                  {item}
                </Button>
              ))
            }
          </Box>
        </Toolbar>
      </AppBar>
      {activePageIndex == 0 ? <CardCreatorPage /> : null}
      {activePageIndex == 1 ? <CatalogPage /> : null}
      {activePageIndex == 2 ? <RandomCardPage /> : null}
    </>
  );
}
