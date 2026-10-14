import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ColorModeProvider from './styles/ColorModeProvider';
import LanguageProvider from './locales/LanguageProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <LanguageProvider><App /></LanguageProvider>
    </ColorModeProvider>
  </React.StrictMode>

);

