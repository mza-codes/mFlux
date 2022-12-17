import LazyImage from "./LazyImage";
import { w500 } from "../Constants/Constants";
import { forwardRef } from "react";
import { image404 } from "../Assets";

const MovieCard = ({ movie, handleStore }) => {

    return (
        <div className="imageContainer max-h-screen max-w-xs m-4 " onClick={e => handleStore(movie)} >
            <div className="image w-64  sm:w-full sm:h-full relative resultImg">
                <LazyImage alt="_loading" className="rounded-xl object-cover w-64 as"
                    url={movie?.poster_path ? (w500 + movie?.poster_path) :
                        movie?.backdrop_path ? (w500 + movie?.backdrop_path) : image404} />
                <div className="absolute text-white text-center text">
                    <h1 className="font-kanit text-2xl truncate">{movie?.title || movie?.original_title}</h1>
                    <h1 className="font-kanit text-xl truncate">{movie?.release_date || movie?.first_air_date}</h1>
                    <p className="font-kanit text-lg overview">{movie?.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

export const MovieCardWRef = forwardRef((props, ref) => {
    // const { movie, handleStore } = props;
    return (
        <div ref={ref}>
            <MovieCard {...props} />
        </div>
    );
});