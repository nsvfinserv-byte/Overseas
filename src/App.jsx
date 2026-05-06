import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Universities from './pages/Universities';
import Referral from './pages/Referral';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:slug" element={<CountryDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
