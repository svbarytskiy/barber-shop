import { useEffect } from 'react';
import { Layout } from './comon/components/layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { UserPage } from './pages/UserPage/UserPage'
import { SelectBarberPage } from './pages/SelectBarberPage/SelectBarberPage'
import { UserPageEdit } from './pages/UserPageEdit/UserPageEdit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage/AdminPage';
import { useStore } from './hooks/useStore';
import BarberLoginPage from './pages/BarberLoginPage/BarberLoginPage';
import { BarberSchedulePage } from './pages/BarberSchedulePage/BarberSchedulePage';
import { SelectDatePage } from './pages/SelectDatePage/SelectDatePage';
import { SelectSlotPage } from './pages/SelectSlotPage/SelectSlotPage';

function App() {
  const { store } = useStore();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      console.log('не негр')
      store.auth.checkAuthUser()
    } else if (localStorage.getItem('barberToken')) {
      console.log('негр')
      store.auth.checkAuthBarber()
    }
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/loginBarber' element={<BarberLoginPage />} />
          <Route path='/userpage/:id' element={<UserPage />} />
          <Route path='/userpage/:id/edit' element={<UserPageEdit />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/barberSchedule/:id' element={<BarberSchedulePage />} />
          <Route path='/selectBarber' element={<SelectBarberPage />} />
          <Route path='/selectDate/:barberId/:service' element={<SelectDatePage />} />
          <Route path='/selectDate/:barberId/:service/selectSlot/:dayId' element={<SelectSlotPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
