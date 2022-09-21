import './App.css';
import React from 'react';
import Main from './Pages/Main';
import MoviePage from './Pages/MoviePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/moviepage/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
