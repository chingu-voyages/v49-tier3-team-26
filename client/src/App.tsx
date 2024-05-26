import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import React, {useState} from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import  Header from './components/Header'
import Footer from './components/Footer'
import Chat from './components/Chat';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import { BrowserRouter as Router, Route, Routes, Navigate,  } from 'react-router-dom';

function App() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
 

  if (loading) return <div>Loading...</div>;

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  const handleChatClick = () => {
    if (user) {
      window.location.href = '/chat';
    } else {
      setShowLogin(true);
    }
  };

  return (
  
      
      
     
      <div>
      <Header handleLoginShow={handleLoginShow} handleRegisterShow={handleRegisterShow} handleChatClick={handleChatClick} />
      <LoginModal show={showLogin} handleClose={handleLoginClose} />
      <RegisterModal show={showRegister} handleClose={handleRegisterClose} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <div>Welcome, please login or register.</div>} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
      </Routes>
  
   
     <Footer />
      </div>
    
  )
}
const AppWrapper: React.FC = () => (
  <AuthProvider>
    <Router>
        <App />
      </Router>
  </AuthProvider>
);

export default AppWrapper
