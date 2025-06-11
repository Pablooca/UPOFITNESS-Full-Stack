import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutMe from './pages/AboutMe';
import Diets from './pages/Diets';
import Appointments from './pages/Appointments';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/aboutme' element={<AboutMe />}/>
            <Route path='/diets' element={<Diets />}/>
            <Route path='/appointments' element={<Appointments />}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
