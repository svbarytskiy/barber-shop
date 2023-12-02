import React, { FC, useEffect, useState, useContext } from 'react';
import { Layout } from './comon/components/layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { UserPage } from './pages/UserPage/UserPage'
import { UserPageEdit } from './pages/UserPageEdit/UserPageEdit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Context } from "./index";
import { AdminPage } from './pages/AdminPage/AdminPage';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.auth.checkAuth()
    }
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/userpage/:id' element={<UserPage />} />
          <Route path='/userpage/:id/edit' element={<UserPageEdit />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
