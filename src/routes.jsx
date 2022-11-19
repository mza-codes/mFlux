import { useRoutes } from 'react-router-dom';
import App from './App';
// import Recents from './Pages/Recents/Recents';
import RecentsNew from './Pages/Recents/Recents_New';
import SearchResults from './Pages/SearchResults';

export default function Router() {

    return useRoutes([
        { path: '/', element: <App /> },
        { path: 'wishlist', element: <div /> },
        { path: 'recents', element: <RecentsNew /> },
        { path: 'account', element: <div /> },
        { path: 'view', element: <div /> },
        { path: '/*', element: <divt /> },
        { path: 'search-results', element: <SearchResults /> }
    ]);
};