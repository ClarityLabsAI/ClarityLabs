import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingA from './pages/LandingA';
import LandingB from './pages/LandingB';
import LandingScan from './pages/LandingScan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/a" element={<LandingA />} />
        <Route path="/b" element={<LandingB />} />
        <Route path="/scan" element={<LandingScan />} />
        <Route path="/" element={<LandingScan />} />
      </Routes>
    </Router>
  );
}

export default App;
