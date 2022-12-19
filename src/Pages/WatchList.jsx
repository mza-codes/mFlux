import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import Navbar from "../Components/Navbar/Navbar";
import useWatchlist from "../Services/Store";

const WatchList = () => {
    const route = useNavigate();
    const watchlist = useWatchlist(s => s.watchlist);
    console.log("prinitng user watchlist", watchlist);

    const handleStore = (movie) => {
        // addOne(movie);
        route(`/recents/${movie?.id}`, { state: movie?.media_type });
        return;
    };

    return (
        <>
            <Navbar />
            <section className="text-white watvhlist pt-20">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-kanit text-4xl">Your Watchlist</h2>
                    {watchlist?.length <= 0 ?
                        <>
                            <span className="text-xl">There's nothing in your watchlist !</span>
                            <Link to="/">
                                <button className="bg-emerald-800 bg-opacity-60 hover:bg-opacity-100  p-2 rounded-lg">Browse</button>
                            </Link>
                        </>
                        : <span className="text-xl">Seems like you got something to watch !</span>
                    }
                </div>
                <main className="flex flex-row flex-wrap justify-center mt-4">
                    {watchlist?.map((movie) => (
                        <MovieCard key={movie?.id} movie={movie} handleStore={handleStore} />
                    ))}
                </main>
            </section>
        </>
    );
};

export default WatchList;