import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/public-pages/Homepage'
import theme from './util/theme'
import Datenschutz from './components/public-pages/Datenschutz';
import Impressum from './components/public-pages/Impressum';
import NotFound from './components/public-pages/NotFound';
import Login from './components/auth/Login';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/private-pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './components/auth/ForgotPassword';
import Profil from './components/private-pages/Profil';
import NewUser from './components/admin/NewUser';
import RequireAdmin from './components/admin/RequireAdmin';
import ActivateUser from './components/auth/ActivateUser';
import SetPassword from './components/auth/SetPassword';
import AllUsers from './components/admin/AllUsers';
import { AdminProvider } from './contexts/AdminContext';
import DataProvider from './contexts/DataContext';
import NewBreak from './components/private-pages/NewBreak';
import LocaleDateProvider from './contexts/LocaleDateProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider className="App">
          <AdminProvider>
            <DataProvider>
              <LocaleDateProvider>
                <Routes>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='datenschutz' element={<Datenschutz />} />
                  <Route path='impressum' element={<Impressum />} />
                  <Route path='activate' element={<ActivateUser />} />
                  <Route path='*' element={<NotFound />} />
                  <Route path='dashboard' element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  } />
                  <Route path='new-break' element={
                    <RequireAuth>
                      <NewBreak />
                    </RequireAuth>
                  } />
                  <Route path='profile' element={
                    <RequireAuth>
                      <Profil />
                    </RequireAuth>
                  }>
                    <Route path=":userId" element={
                      <RequireAdmin>
                        <Profil />
                      </RequireAdmin>
                    } />
                  </Route>
                  <Route path='set-password' element={
                    <RequireAuth>
                      <SetPassword />
                    </RequireAuth>
                  } />
                  <Route path='new-user' element={
                    <RequireAuth>
                      <RequireAdmin>
                        <NewUser />
                      </RequireAdmin>
                    </RequireAuth>
                  } />
                  <Route path='users' element={
                    <RequireAuth>
                      <RequireAdmin>
                        <AllUsers />
                      </RequireAdmin>
                    </RequireAuth>
                  } />
                </Routes>
              </LocaleDateProvider>
            </DataProvider>
          </AdminProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
