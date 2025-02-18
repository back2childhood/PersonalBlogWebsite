import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Search from './Pages/Search/Search';
import Header from './Common/Header';
import Home from './Pages/Home/Home';
import Add from './Pages/Add/Add';
import Detail from './Pages/Detail/Detail';

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