import { createContext, useState, useEffect, useContext, ReactNode } from 'react';



interface Adopter {}

interface Shelter extends Adopter {}

interface AuthContextProps {
  user: Adopter | null;
  admins: Shelter[];
  loading: boolean;
  login: (email: string, password: string, ) => Promise<void>;
  register: (email: string, password: string, role: string, onSuccess: (message: string) => void) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Adopter | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [admins, setAdmins] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/v1/auth/user', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data)
          localStorage.setItem('user', JSON.stringify(data));
        
          } else {
            setUser(null);
            localStorage.removeItem('user');
          }
       
      } catch (error) {
       
        setUser(null)
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8000/v1/user/search?role=shelter', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          setAdmins([]);
        }
      } catch (error) {
       
        setAdmins([]);
      }
    };

    fetchUser();
    fetchAdmins();
  }, []);

  const login = async (email: string, password: string, ) => {
    try {
      const response = await fetch('http://localhost:8000/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const responseData = await response.json();
       
        const user = {
          id: responseData.data.userId,
          email: responseData.data.username,
          role: responseData.data.role
        };
        setUser(user); 
         localStorage.setItem('user', JSON.stringify(user));
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (email: string, password: string, role: string, onSuccess: (message: string) => void) => {
    try {
      const response = await fetch('http://localhost:8000/v1/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      if (response.ok) {
        const responseData = await response.json();
        onSuccess(responseData.message); 
       
      } else{
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = async () => {
    try {
     
      const response = await fetch('http://localhost:8000/v1/user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
       setUser(null);     

      }
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
