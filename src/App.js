import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Homepage from './components/public-pages/Homepage'
import theme from './util/theme'
import Datenschutz from './components/public-pages/Datenschutz';
import Impressum from './components/public-pages/Impressum';
import NotFound from './components/public-pages/NotFound';
import Login from './components/auth/Login';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='datenschutz' element={<Datenschutz />} />
            <Route path='impressum' element={<Impressum />} />
            <Route path='*' element={<NotFound />} />
            <Route path='dashboard' element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
          </Routes>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
