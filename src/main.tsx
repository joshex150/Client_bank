import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './context/User/userContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserContextProvider>
)
