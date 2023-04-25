import React from 'react';
import './App.css';
import {BrowserRouter ,Route, Routes } from 'react-router-dom';
import VehicleForm from './Componets/VehicleForm';
import ApiData from './Componets/ApiData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehicleForm />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
