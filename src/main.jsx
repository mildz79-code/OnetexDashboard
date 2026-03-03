import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global reset
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  button { font-family: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D4D0C8; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #A09B93; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
