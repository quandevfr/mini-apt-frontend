import { createContext, useState } from 'react';

type AuthFlowContextType = {
  email: string | null;
  otp: string | null;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  resetFlow: () => void;
};

const AuthFlowContext = createContext<AuthFlowContextType | null>(null);

export const AuthFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);

  const resetFlow = () => {
    setEmail(null);
    setOtp(null);
  };

  return (
    <AuthFlowContext.Provider value={{ email, otp, setEmail, setOtp, resetFlow }}>
      {children}
    </AuthFlowContext.Provider>
  );
};

export default AuthFlowContext;
