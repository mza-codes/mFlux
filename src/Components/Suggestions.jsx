import { useCallback, useRef } from "react";
import useTmdbApi from "../Services/tmdb_Api";
import { hooker } from "../Utils/tmdb";
import LoaderMini from "./LoaderMini";
import { PostModelN, PostModelNWRef } from "./PostModel";

let v = 1;
const Suggestions = ({ getFunc, genres, currentGenre, state }) => {

    const getMoreSuggestions = useTmdbApi(s => s.getMoreSuggestions);
    const suggestions = useTmdbApi(s => s.suggestions);
    const isFetching = hooker("isFetching", useTmdbApi);
    const totalpages = hooker("totalSuggestions", useTmdbApi);

    const observer = useRef();

    const lastItem = useCallback(node => {
        if (isFetching) return false;
        if (observer.current) observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting) {
                console.count("INTERSECTING CALLING API");
                getMoreSuggestions({ genreId: genres[currentGenre]?.id, page: v + 1, type: state });
                if (v === totalpages) {
                    console.log('SETTTING v BACK TO 0, totalpages === v', totalpages, "===", v);
                    v = 0;
                } else v = v + 1;
                console.log("Item Visible");
                return true;
            };
        });
        if (node) return observer.current.observe(node);
    }, []);

    return (
        <section className="suggestionSection w-full text-center">
            <h3 className='text-3xl py-3 font-righteous'>You Might Also Like</h3>
            <main className="suggestionsWrapper flex flex-row flex-wrap w-full items-center justify-center ">
                {suggestions?.map((movie, idx) => {
                    if (suggestions?.length === idx + 1) {
                        return <PostModelNWRef key={parseInt(movie?.id) * (idx - 10)} movie={movie} handleStore={getFunc} ref={lastItem} />
                    } else return <PostModelN key={parseInt(movie?.id) * (idx - 10)} movie={movie} handleStore={getFunc} />
                })}
            </main>
            {isFetching && <LoaderMini />}
        </section>
    );
};

export default Suggestions;