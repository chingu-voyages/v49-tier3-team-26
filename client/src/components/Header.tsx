import React from "react"
import { useAuth } from '../AuthContext';

interface HeaderProps {
    handleLoginShow: () => void;
    handleRegisterShow: () => void;
    handleChatClick: () => void;
  }

function Header({ handleLoginShow, handleRegisterShow, handleChatClick }: HeaderProps) {
    const { user, logout } = useAuth();
    const handleLogout = async () => {
        await logout();
      };
    return(
        <header style={headerStyle}>
            <h1 style={titleStyle}>PAWFECT Match</h1>
            <div style={buttonContainerStyle}>
            {user ? (
        <div>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleChatClick}>Chat</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLoginShow} style={buttonStyle}>Login</button>
          <button onClick={handleRegisterShow} style={buttonStyle}>Register</button>
        </div>
      )}</div>
        </header >
    )

   
}
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#282c34',
  color: 'white',
  position: 'absolute',
  top: 0,
  width: '100%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
  marginLeft: '10px',
  padding: '8px 16px',
  backgroundColor: '#61dafb',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: '#282c34',
  fontWeight: 'bold',
};
export default Header