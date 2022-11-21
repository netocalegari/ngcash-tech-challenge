import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard/'

function MainRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='*' element={<Navigate replace to='/login'/>}/>
    </Routes>
  );
};

export default MainRoutes;