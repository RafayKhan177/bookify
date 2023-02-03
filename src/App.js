//DIPENDENCIES
import { Route, Routes } from 'react-router-dom';
//PAGES
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './List';
//CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Header from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/' element={<RegisterPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/book/list' element={<ListingPage />} />
        <Route exact path='/book/view/:bookId' element={<Details />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
