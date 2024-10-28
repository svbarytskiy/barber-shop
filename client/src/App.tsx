import { useEffect, useState } from 'react';
import { Layout } from './comon/components/layout/Layout';
import { MainPage } from './pages/MainPage/MainPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { UserPage } from './pages/UserPage/UserPage';
import { SelectBarberPage } from './pages/SelectBarberPage/SelectBarberPage';
import { UserPageEdit } from './pages/UserPageEdit/UserPageEdit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { useStore } from './hooks/useStore';
import BarberLoginPage from './pages/BarberLoginPage/BarberLoginPage';
import { BarberSchedulePage } from './pages/BarberSchedulePage/BarberSchedulePage';
import { SelectDatePage } from './pages/SelectDatePage/SelectDatePage';
import { SelectSlotPage } from './pages/SelectSlotPage/SelectSlotPage';
import { OrderPage } from './pages/OrderPage/OrderPage';
import RequireAuth from './hocs/RequireAuth';
import LoadingScreen from './modules/LoadingScreen/LoadingScreen';

function App() {
  const { store } = useStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('userToken')) {
        await store.auth.checkAuthUser();  // Await of user auth checking
      } else if (localStorage.getItem('barberToken')) {
        await store.auth.checkAuthBarber();  // Await of barber auth checking
      }
      setIsAuthChecked(true);
    };
   
    const timeoutId = setTimeout(() => {
      checkAuth();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [store.auth]);
  

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/loginBarber' element={<BarberLoginPage />} />

          <Route path='/userpage/:id' element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          } />
          <Route path='/userpage/:id/edit' element={
            <RequireAuth>
              <UserPageEdit />
            </RequireAuth>
          } />
          <Route path='/admin' element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          } />
          <Route path='/barberSchedule/:id' element={
            <RequireAuth>
              <BarberSchedulePage />
            </RequireAuth>
          } />
          <Route path='/selectBarber' element={
            <RequireAuth>
              <SelectBarberPage />
            </RequireAuth>
          } />
          <Route path='/setOrder/:barberId/' element={
            <RequireAuth>
              <OrderPage />
            </RequireAuth>
          } />
          <Route path='/selectDate/:barberId/:service' element={<SelectDatePage />} />
          <Route path='/selectDate/:barberId/:service/selectSlot/:dayId' element={<SelectSlotPage />} />

          <Route path='*' element={<p className='text-4xl mx-auto my-auto'>
            Куда лізеш пиріжок? ти не туда попав
          </p>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
