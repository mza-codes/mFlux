import axios from "axios";
import { TMDB_URL } from "../Constants/Constants";

export const tmdbApi = axios.create({
    baseURL: TMDB_URL,
    timeout: 5000
});

export const hooker = (value, hook) => {
    return hook(state => state[value]);
};

// // const observer = useRef();

    // const lastItem = useCallback(node => {
    //     if (isFetching) return false;
    //     if (observer.current) observer.current?.disconnect();
    //     observer.current = new IntersectionObserver(entries => {
    //         if (entries[0]?.isIntersecting) {
    //             // case here
    //             console.log("Genre position", v);
    //             // getSuggestions({ genreId: genres[v]?.id });

    //             if (v === genres.length) {
    //                 console.log("Item Visible");
    //                 v = 0;
    //             } else v = v + 1;
    //             console.log("Item Visible");
    //             return true;
    //         };
    //     });

    //     if (node) return observer.current.observe(node);
    // }, []);
// Dynamic Scroll alt method

// const scrollMonitor = () => {
//     console.log("Called function: ", called);
//     if (!called) {
//         called = true;
//         getMoreSuggestions({ genreId: genres[currentGenre]?.id, page: v + 1 });
//         v = v + 1;
//         return true;
//     };
// };

// window.onscroll = () => {
//     if (window.innerHeight +
//         document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight) {
//         scrollMonitor();
//     };
// };

// if (called) {
//     setTimeout(() => {
//         console.log("Clear for Fetch Again");
//         called = false;
//     }, 5000);
// };

// const { actor, actorMovies, actorResult, getMoviesByActorId, getActor } = useTmdbApi();
// const actor = hooker("actor",useTmdbApi);
// const actorMovies = hooker("actorMovies",useTmdbApi);
// const actorResult = hooker("actorResult",useTmdbApi);
// const getMoviesByActorId = hooker("getMoviesByActorId",useTmdbApi);
// const getActor = hooker("getActor",useTmdbApi);
// 
// 