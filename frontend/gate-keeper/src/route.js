import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Gatekeeper from './scenes/Gatekeeper'

const Routesfile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Gatekeeper/>} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default Routesfile;