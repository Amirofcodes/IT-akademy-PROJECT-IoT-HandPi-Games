import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import './App.css';
import GamePage from './pages/Game';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
        <Header />
        <main className="p-4 container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </main>
        <Footer/>
    </Router>
    
  
  );
}

export default App;
