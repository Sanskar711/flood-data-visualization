// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import MapComponent from './components/MapComponent';
import TeamComponent from './components/TeamComponent';
import GaugeDetails from './components/GaugeDetails';
import './App.css';

const App = () => (
  <Router>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flood Data Visualization
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/team">
          Team
        </Button>
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<MapComponent />} />
      <Route path="/team" element={<TeamComponent />} />
      <Route path="/:gaugeId" element={<GaugeDetails />} />
    </Routes>
  </Router>
);

export default App;
