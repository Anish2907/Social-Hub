import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>

);


