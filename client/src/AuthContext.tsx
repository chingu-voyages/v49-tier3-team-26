import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface Adopter {
  id: string;
  email: string;
  role: string;
}

interface Shelter extends Adopter {
  email: string;
}

interface AuthContextProps {
  user: Adopter | null;
  admins: Shelter[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Adopter | null>(null);
  const [admins, setAdmins] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://pawfect-match-api.onrender.com/v1/user/search?role=adopter', { withCredentials: true });
        
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]); // Ensure we set only one user object
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('No user logged in:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('https://pawfect-match-api.onrender.com/v1/user/search?role=shelter', { withCredentials: true });
       
        setAdmins(response.data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };

    fetchUser();
    fetchAdmins();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://pawfect-match-api.onrender.com/v1/user/login', { email, password }, { withCredentials: true });
      
      setUser(response.data.user); 
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data || error.message);
      }
    }
  };

  const register = async (email: string, password: string, role: string) => {
    try {
      await axios.post('https://pawfect-match-api.onrender.com/v1/user', { email, password, role });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('https://pawfect-match-api.onrender.com/v1/user/logout', {}, { withCredentials: true });
      console.log('Logout response:', response.data); // Log the response
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, admins, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
