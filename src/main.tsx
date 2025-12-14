// Libs
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Components
import App from './App.tsx';

// Context
import { AuthProvider } from './context/AuthContext.tsx';

// Styles
import './index.css';
import { ThemeProvider } from './context/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
