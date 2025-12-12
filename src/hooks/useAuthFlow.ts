// Libs
import { useContext } from 'react';

// Context
import AuthFlowContext from '@/context/AuthFlowContext';

export const useAuthFlow = () => {
  const context = useContext(AuthFlowContext);

  if (!context) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider');
  }

  return context;
};
