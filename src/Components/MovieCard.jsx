import LazyImage from "./LazyImage";
import { w500 } from "../Constants/Constants";
import defaultImg from '../Assets/default.jpg';

const MovieCard = ({ movie, handleStore }) => (
    <div className="imageContainer max-h-screen max-w-xs m-4 " onClick={e => handleStore(movie)} >
        <div className="image w-64 h-96 sm:w-full sm:h-full relative resultImg">
            <LazyImage alt="_loading" className="rounded-xl"
                url={movie?.poster_path || movie?.backdrop_path ? (w500 + movie?.poster_path || movie?.backdrop_path) : defaultImg} />
            <div className="absolute text-white text-center text">
                <h1 className="font-kanit text-2xl truncate">{movie?.title || movie?.original_title}</h1>
                <h1 className="font-kanit text-xl truncate">{movie?.release_date || movie?.first_air_date}</h1>
                <p className="font-kanit text-lg overview">{movie?.overview}</p>
            </div>
        </div>
    </div>
);

export default MovieCard;