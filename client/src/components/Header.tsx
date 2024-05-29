
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
        <header >
            <h1 >PAWFECT Match</h1>
            <div >
            {user ? (
        <div>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleChatClick}>Chat</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLoginShow} >Login</button>
          <button onClick={handleRegisterShow} >Register</button>
        </div>
      )}</div>
        </header >
    )

   
}

export default Header