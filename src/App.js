import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Homepage from './components/public-pages/Homepage'
import theme from './util/theme'
import Datenschutz from './components/public-pages/Datenschutz';
import Impressum from './components/public-pages/Impressum';
import NotFound from './components/public-pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='datenschutz' element={<Datenschutz />} />
            <Route path='impressum' element={<Impressum />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
