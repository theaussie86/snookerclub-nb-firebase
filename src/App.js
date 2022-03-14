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
import MyProfile from './components/private-pages/MyProfile';
import AnyProfile from './components/admin/AnyProfile';
import NewUser from './components/admin/NewUser';
import RequireAdmin from './components/admin/RequireAdmin';
import SetPassword from './components/auth/SetPassword';
import AllUsers from './components/admin/AllUsers';
import { AdminProvider } from './contexts/AdminContext';
import DataProvider from './contexts/DataContext';
import NewBreak from './components/private-pages/NewBreak';
import LocaleDateProvider from './contexts/LocaleDateProvider';
import Breaks from './components/private-pages/Breaks';
import Membership from './components/admin/Membership';
import NewRent from './components/private-pages/NewRent';
import Rents from './components/private-pages/Rents';
import { Bills } from './components/private-pages/Bills';
import { Bill } from './components/public-pages/Bill';
import AccountManagement from './components/auth/AccountManagement';

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
                  <Route path='manage' element={<AccountManagement />} />
                  <Route path='*' element={<NotFound />} />
                  <Route path='dashboard' element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  } />
                  <Route path='new-rent' element={
                    <RequireAuth>
                      <NewRent />
                    </RequireAuth>
                  } />
                  <Route path='new-break' element={
                    <RequireAuth>
                      <NewBreak />
                    </RequireAuth>
                  } />
                  <Route path='breaks' element={
                    <RequireAuth>
                      <Breaks />
                    </RequireAuth>
                  } />
                  <Route path='rents' element={
                    <RequireAuth>
                      <Rents />
                    </RequireAuth>
                  } />
                  <Route path='bills' element={
                    <RequireAuth>
                      <Bills />
                    </RequireAuth>
                  } />
                  <Route path='bills/:content/:iv/:tag' element={<Bill />} />
                  <Route path='profile' element={
                    <RequireAuth>
                      <MyProfile />
                    </RequireAuth>
                  } />
                  <Route path="profile/:userId" element={
                    <RequireAuth>
                      <RequireAdmin>
                        <AnyProfile />
                      </RequireAdmin>
                    </RequireAuth>
                  } />
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
                  <Route path='membership/:userId' element={
                    <RequireAuth>
                      <RequireAdmin>
                        <Membership />
                      </RequireAdmin>
                    </RequireAuth>
                  } />
                  <Route path='membership/:userId/:membershipId' element={
                    <RequireAuth>
                      <RequireAdmin>
                        <Membership />
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
