import React from "react";
import ReactDOM from "react-dom/client";
import { getPoaps } from './helpers/api';

import { CssBaseline, MuiThemeProvider, Container } from '@material-ui/core';
import theme from './theme';

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import Create from "./routes/create";
import Manage from "./routes/manage";
import Poap from "./routes/poap";
import PageNotFound from "./routes/404";
import Footer from './components/Footer';
import Nav from './components/Nav'

export const PoapsContext = React.createContext();

const MyApp = () => {
  const [poaps, setsPoaps] = React.useState(null);
  
  const setupPoaps = async (savedLsPoaps) => {
    const poapCollection = await getPoaps(savedLsPoaps);
    setsPoaps(poapCollection);
  }

  React.useEffect(() => {
    const savedLsPoaps = window.localStorage.getItem('lsPoaps');
    savedLsPoaps ? setupPoaps(savedLsPoaps) : setsPoaps([]);
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <PoapsContext.Provider value={[poaps, setsPoaps]}>
        <CssBaseline />
        <HashRouter>
          <Nav />
          <Container maxWidth="xs">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="create" element={<Create />} />
              <Route path="manage" element={<Manage />} />
              <Route path="poap/:id" element={<Poap />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Container>
          <Footer />
        </HashRouter>
      </PoapsContext.Provider>
    </MuiThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <MyApp />
);