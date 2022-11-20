import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from './Pages/Loading';
// import App from './App';
// // import Recents from './Pages/Recents/Recents';
// import RecentsNew from './Pages/Recents/Recents_New';
// import SearchResults from './Pages/SearchResults';
// import ViewActor from './Pages/ViewActor';

const RecentsNew = lazy(() => import('./Pages/Recents/Recents_New'));
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
            path: 'recents', element:
                <Suspense fallback={<Loading />}> <RecentsNew /> </Suspense>
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
                <Suspense fallback={<Loading />}> <div /> </Suspense>
        },
        {
            path: 'search-results', element:
                <Suspense fallback={<Loading />}> <SearchResults /> </Suspense>
        },
        {
            path: 'actor-details', element:
                <Suspense fallback={<Loading />}> <ViewActor /></Suspense>
        }
    ]);
};