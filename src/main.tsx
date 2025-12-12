// Libs
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App.tsx';

// Context
import { AuthProvider } from './context/AuthContext.tsx';

// Styles
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
