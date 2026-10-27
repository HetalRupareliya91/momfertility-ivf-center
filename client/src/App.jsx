import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Doctors from './pages/Doctors.jsx';
import SuccessStories from './pages/SuccessStories.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import FAQ from './pages/FAQ.jsx';
import Calculator from './pages/Calculator.jsx';
import Contact from './pages/Contact.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="success-stories" element={<SuccessStories />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="ivf-cost-calculator" element={<Calculator />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
