import LazyImage from "./LazyImage";
import { w500 } from "../Constants/Constants";
import { forwardRef } from "react";
import { image404 } from "../Assets";
import useWatchlist from "../Services/Store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, hide, handleStore }) => {
    const addToWatchList = useWatchlist((s) => s.addToWatchList);
    const route = useNavigate();

    const viewMovie = () => {
        route(`/explore/${movie?.id}/${movie?.media_type ?? "tv"}`);
        return;
    };

    return (
        <div className="movieCard max-h-screen max-w-xs m-4 ">
            <div className="image w-64 sm:w-full sm:h-full relative resultImg">
                <Link to={`/explore/${movie?.id}/${movie?.media_type ?? "tv"}`}>
                    <LazyImage
                        alt="_loading"
                        className="rounded-xl object-cover w-64 as"
                        url={
                            movie?.poster_path
                                ? w500 + movie?.poster_path
                                : movie?.backdrop_path
                                ? w500 + movie?.backdrop_path
                                : image404
                        }
                    />
                </Link>
                {!hide && (
                    <div
                        title="Add To Favourites"
                        className="icon text-rose-600 hover:text-rose-500 z-[104] opacity-0 hover:opacity-95
                            cursor-pointer absolute right-2 top-2"
                        onClick={() => {
                            addToWatchList(movie);
                        }}
                    >
                        <iconify-icon icon="mdi:movie-open-star" width={18} height={18} />
                    </div>
                )}
                <div className="absolute text-white text-center text" onClick={viewMovie}>
                    <h1 className="font-kanit text-2xl truncate">
                        {movie?.title || movie?.original_title || movie?.original_name || movie?.name}
                    </h1>
                    <h1 className="font-kanit text-xl truncate">{movie?.release_date || movie?.first_air_date}</h1>
                    <p className="font-kanit text-lg overview">{movie?.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

export const MovieCardWRef = forwardRef((props, ref) => (
    <div ref={ref}>
        <MovieCard {...props} />
    </div>
));
