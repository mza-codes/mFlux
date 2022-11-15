import { useRoutes } from 'react-router-dom';
import App from './App';
import Recents from './Pages/Recents/Recents';

export default function Router() {

    return useRoutes([
        { path: '/', element: <App /> },
        { path: 'wishlist', element: <div /> },
        { path: 'recents', element: <Recents /> },
        { path: 'account', element: <div /> },
        { path: 'view', element: <div /> },
        { path: '/*', element: <divt /> },
    ]);
};