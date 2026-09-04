import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './NavBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar este în afara <Routes>, deci apare pe toate paginile */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Ruta * prinde orice link neexistent (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer este în afara <Routes>, deci apare pe toate paginile */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;