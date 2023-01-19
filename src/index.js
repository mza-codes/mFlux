import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Router from './routes';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Pages/Loading';
import { ToastContainer } from 'react-toastify';
import * as ServiceWorker from "./serviceWorkerRegistration";

const root = createRoot(document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  console.log = () => { return; }
  console.error = () => { return; }
  console.debug = () => { return; }
};

root.render(
  <HashRouter hashType="hashbang">
    <Suspense fallback={<Loading />}>
      <ToastContainer limit={3} />
      <Router />
    </Suspense>
  </HashRouter>
);

ServiceWorker.register();
