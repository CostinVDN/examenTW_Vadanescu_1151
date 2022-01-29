import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMovies from './components/AddMovies';
import EditMovie from './components/EditMovie';

export default function App() {
    return (
      <>
       <Navbar />
       <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addmovie" element={<AddMovies />} />
        <Route path="/editmovie/:id" element={<EditMovie />} />
      </Routes>
    </BrowserRouter>
      </>
    );
  }
