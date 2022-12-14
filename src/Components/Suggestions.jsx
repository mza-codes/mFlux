import useTmdbApi from "../Services/tmdb_Api";
import { hooker } from "../Utils/tmdb";
import LoaderMini from "./LoaderMini";
import MovieCard, { MovieCardWRef } from "./MovieCard";

let v = 1;
let called = false;
const Suggestions = ({ getFunc, genres, currentGenre }) => {
    const getMoreSuggestions = useTmdbApi(s => s.getMoreSuggestions);
    const suggestions = useTmdbApi(s => s.suggestions);
    const isFetching = hooker("isFetching", useTmdbApi);

    console.log("Called Value", called);

    const scrollMonitor = () => {
        console.log("Called function: ", called);
        if (!called) {
            called = true;
            getMoreSuggestions({ genreId: genres[currentGenre]?.id, page: v + 1 });
            v = v + 1;
            return true;
        };
    };

    window.onscroll = () => {
        if (window.innerHeight +
            document.documentElement.scrollTop ===
            document.documentElement.offsetHeight) {
            scrollMonitor();
        };
    };

    if (called) {
        setTimeout(() => {
            console.log("Clear for Fetch Again");
            called = false;
        }, 5000);
    };

    // useEffect(() => {
    //     const myInterval = setTimeout(() => {
    //         console.log("Clear to fetch again");
    //         called = false;
    //     }, (1000 * 5));
    //     return () => {
    //         called = false;
    //         clearInterval(myInterval);
    //     };
    // }, [called]);

    return (
        <section className="suggestionSection w-full text-center">
            <h3 className='text-3xl py-3 font-righteous'>You Might Also Like</h3>
            <main className="suggestionsWrapper flex flex-row flex-wrap w-full items-center justify-center ">
                {suggestions?.map((movie, idx) => {
                    if (suggestions?.length === idx + 1) {
                        return <MovieCardWRef key={parseInt(movie?.id) * (idx - 10)} movie={movie} handleStore={getFunc} />
                    } else return <MovieCard key={parseInt(movie?.id) * (idx - 10)} movie={movie} handleStore={getFunc} />
                })}
            </main>
            {isFetching && <LoaderMini />}
        </section>
    );
};

export default Suggestions;