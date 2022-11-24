// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container py-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<Admin />} />
          <Route path="/posts/:id" element={<Admin />} />
          <Route path="/posts/create" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


