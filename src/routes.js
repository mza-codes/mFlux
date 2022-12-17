import { lazy, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import useRow from './Services/Row';

const WatchList = lazy(() => import('./Pages/WatchList'));
const Recents = lazy(() => import('./Pages/Recents/RecentsV2'));
const App = lazy(() => import('./App'));
const SearchResults = lazy(() => import('./Pages/SearchResults'));
const ViewActor = lazy(() => import('./Pages/ViewActor'));

export default function Router() {
    const fillRows = useRow(s => s.populateLocal);

    useEffect(() => {
        console.count("Rendered router");
        fillRows();
    }, []);

    return useRoutes([
        {
            path: '/', element: <App />
        },
        {
            path: 'recents/:id', element: <Recents />
        },
        {
            path: '/*', element: <ErrorPage />
        },
        {
            path: 'search-results', element: <SearchResults />
        },
        {
            path: 'actor-details/:id', element: <ViewActor />
        },
        {
            path: 'watchlist', element: <WatchList />
        }
    ]);
};