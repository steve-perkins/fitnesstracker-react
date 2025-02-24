import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import GoogleOAuthProviderWrapper from './GoogleOAuthProvider.tsx';

import {AuthProvider} from "./context/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProviderWrapper>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProviderWrapper>
  </StrictMode>,
)
