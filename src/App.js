// import logo from './logo.svg';
import './App.css';
import Admin from './components/Admin';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Admin />} />
          <Route path="/posts/:id" element={<Admin />} />
          <Route path="/posts/create" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


