import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search/Search';
import Header from './common/Header';
import Home from './pages/Home';
import Add from './pages/Add';
import Detail from './pages/Detail';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/experts' element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search/:keywords" element={<Search />} />
          <Route path='/add' element={<Add />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;