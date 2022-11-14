import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecentsProvider from './Contexts/RecentsProvider';
import Router from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecentsProvider>
    <BrowserRouter>
      {/* <App /> */}
      <Router />
    </BrowserRouter>
  </RecentsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
