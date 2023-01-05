import { lazy, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import HomeV1 from './Pages/HomeV1';
import useRow from './Services/Row';

const WatchList = lazy(() => import('./Pages/WatchList'));
const Recents = lazy(() => import('./Pages/Recents/RecentsV2'));
const App = lazy(() => import('./App'));
const SearchResults = lazy(() => import('./Pages/SearchResults'));
const ViewActor = lazy(() => import('./Pages/ViewActor'));
const ViewActors = lazy(() => import('./Pages/Favourites/ViewActors'));

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
            path: '/mflux-v1', element: <HomeV1 />
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
            path: 'favourites/actors', element: <ViewActors />
        },
        {
            path: 'watchlist', element: <WatchList />
        }

    ]);
};