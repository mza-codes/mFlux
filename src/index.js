import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Router from './routes';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Pages/Loading';
import { ToastContainer } from 'react-toastify';
import * as ServiceWorker from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter hashType="hashbang">
    <Suspense fallback={<Loading />}>
      <ToastContainer limit={3} />
      <Router />
    </Suspense>
  </HashRouter>
);

ServiceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
