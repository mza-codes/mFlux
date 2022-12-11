import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from './Pages/Loading';
import ErrorPage from './Components/ErrorPage';

const WatchList = lazy(() => import('./Pages/WatchList'));
const Recents = lazy(() => import('./Pages/Recents/RecentsV2'));
const App = lazy(() => import('./App'));
const SearchResults = lazy(() => import('./Pages/SearchResults'));
const ViewActor = lazy(() => import('./Pages/ViewActor'));

export default function Router() {

    return useRoutes([
        {
            path: '/', element:
                <Suspense fallback={<Loading />}> <App /> </Suspense>
        },
        {
            path: 'wishlist', element:
                <Suspense fallback={<Loading />}> <div /> </Suspense>
        },
        {
            path: 'recents/:id', element:
                <Suspense fallback={<Loading />}> <Recents /> </Suspense>
        },
        {
            path: 'account', element:
                <Suspense fallback={<Loading />}> <div /> </Suspense>
        },
        {
            path: 'view', element:
                <Suspense fallback={<Loading />}> <div /> </Suspense>
        },
        {
            path: '/*', element:
                <Suspense fallback={<Loading />}> <ErrorPage /> </Suspense>
        },
        {
            path: 'search-results', element:
                <Suspense fallback={<Loading />}> <SearchResults /> </Suspense>
        },
        {
            path: 'actor-details/:id', element:
                <Suspense fallback={<Loading />}> <ViewActor /></Suspense>
        },
        {
            path: 'watchlist', element:
                <Suspense fallback={<Loading />}> <WatchList /></Suspense>
        }
    ]);
};