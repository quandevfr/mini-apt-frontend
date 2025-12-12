import { createContext, useState, type PropsWithChildren } from 'react';

interface User {
  email: string;
  username: string | '';
}

type AuthContext = {
  accessToken?: string | null;
  currentUser?: User | null;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      // todo: call api login
    } catch (error) {
      console.error('Lỗi xảy ra khi gọi handleLogin', error);
      setAccessToken(null);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    setAccessToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, currentUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
