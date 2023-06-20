import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './component/Header';
import React from 'react';
import FavouriteBanner from './component/FavouriteBanner'
import { useState } from 'react';
import DesignBanner from './component/DesignBanner';
import Footer from './component/Footer';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './pages/Details';

function App() {
  const [isFavouritePanelOpen, setIsFavouritePanelOpen] = useState(false);
  const toggleFavoriteSlide = () => {
    if (isFavouritePanelOpen) { setIsFavouritePanelOpen(false); }
    else { setIsFavouritePanelOpen(true); }

  };
  return (
    <React.StrictMode>
    <Router basename="/Masa-Abushamma-Project1">
      <div className="App">
        <Header toggleFavoriteSlide={toggleFavoriteSlide} />
        <DesignBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes><Footer />
        {isFavouritePanelOpen &&
          <FavouriteBanner />}
      </div>
    </Router>
    </React.StrictMode>
  );
}

export default App;
