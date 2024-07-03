import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <Router>
        <Header />
        <main className="p-4 container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;
