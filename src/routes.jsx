import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const WatchList = lazy(() => import("./Pages/WatchList"));
const Recents = lazy(() => import("./Pages/Recents/RecentsV2"));
const AppWrapper = lazy(() => import("./Components/AppWrapper"));
const SearchResults = lazy(() => import("./Pages/SearchResults"));
const ViewActor = lazy(() => import("./Pages/ViewActor"));
const ViewActors = lazy(() => import("./Pages/Favourites/ViewActors"));
const HomeV1 = lazy(() => import("./Pages/HomeV1"));
const ErrorPage = lazy(() => import("./Components/ErrorPage"));

// function clearCache() {
//     // localStorage.removeItem(mfluxCache);
//     listCategories.forEach(({ key }) => {
//         localStorage.removeItem(key);
//     });
// }

export default function Router() {
    // const fillRows = useRow((s) => s.populateLocal);

    // useEffect(() => {
    //     console.count("Rendered router");
    //     // clearCache();
    //     fillRows();
    // }, []);

    return useRoutes([
        {
            path: "/",
            element: <AppWrapper />,
        },
        {
            path: "mflux-v1",
            element: <HomeV1 />,
        },
        {
            path: "recents/:id",
            element: <Recents />,
        },
        {
            path: "explore/:id/:q",
            element: <Recents />,
        },
        {
            path: "/*",
            element: <ErrorPage />,
        },
        {
            path: "search-results",
            element: <SearchResults />,
        },
        {
            path: "actor-details/:id",
            element: <ViewActor />,
        },
        {
            path: "favourites/actors",
            element: <ViewActors />,
        },
        {
            path: "watchlist",
            element: <WatchList />,
        },
    ]);
}
