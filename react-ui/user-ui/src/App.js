import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Library from './components/library/Library';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Library />
    </div>
  );
}

export default App;
