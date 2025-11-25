import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingA from './pages/LandingA';
import LandingB from './pages/LandingB';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/a" element={<LandingA />} />
        <Route path="/b" element={<LandingB />} />
        <Route path="/" element={<Navigate to="/a" replace />} />
      </Routes>
    </Router>
  );
}

export default App;