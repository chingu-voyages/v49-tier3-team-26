import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {useState} from 'react';
import { useAuth } from './AuthContext';
import  Header from './components/Header'
import Footer from './components/Footer'
import ChatRoom from './components/ChatRoom';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import {Route, Routes, Navigate , useNavigate} from 'react-router-dom';
import Discover from './components/Discover';
import CreateListing from './components/CreateListing'
import PetPage from './components/PetPage';


function App() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
 

  if (loading) return <div>Loading...</div>;

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);
    

  const handleChatClick = () => {
    if (user) {
     navigate('/chat')
    
    } else {
      console.log('User is not logged in, showing login modal');
      setShowLogin(true)
    }
  };

  return (
  
    <div className='app-container'>
      <Header handleLoginShow={handleLoginShow} handleRegisterShow={handleRegisterShow} handleChatClick={handleChatClick} />
      <LoginModal show={showLogin} handleClose={handleLoginClose} />
      <RegisterModal show={showRegister} handleClose={handleRegisterClose} handleLoginShow={handleLoginShow} />
      <div className='main-content'>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/" /> : <div>Welcome, please login or register.</div>} />
        <Route path="/chat" element={user ? <ChatRoom /> : <Navigate to="/" />} />
        <Route path="/discover" element={<Discover />} />

        

        <Route path="/new-listing" element={<CreateListing />} />
        <Route path="/discover/:id" element={<PetPage />} />

      </Routes>

    </div>
      <Footer />
    </div>
    
  )
}


export default App
