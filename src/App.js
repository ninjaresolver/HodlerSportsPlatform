import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Web3ReactProvider } from '@web3-react/core';
import store from './store';
import getLibrary from './configs/getLibrary';
import useCustomTheme from "./hooks/useCustomTheme";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import './App.css';


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { customTheme } = useCustomTheme(darkMode);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </BrowserRouter>
          </Web3ReactProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
