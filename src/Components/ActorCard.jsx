import { image404 } from "../Assets";
import { w780 } from "../Constants/Constants";
import LazyImage from "./LazyImage";

const ActorCard = ({ actor, ...props }) => {
    return (
        <div {...props} className="imageContainer max-h-screen max-w-xs m-4">
            <div className="image w-64 sm:w-full sm:h-full relative resultImg">
                <LazyImage alt="_loading" className="rounded-xl object-cover w-64 as"
                    url={actor?.profile_path ? (w780 + actor?.profile_path) : image404} />
                <div className="absolute text-white text-center text">
                    <p className="font-kanit text-2xl truncate">{actor?.name || ""}</p>
                    <p className="font-kanit text-xl truncate">{actor?.known_for_department || ""}</p>
                    {actor?.known_for?.map((movie) => (
                        <>
                            <h1 className="font-kanit text-2xl truncate">{movie?.title || movie?.original_title ||
                                movie?.original_name || movie?.name}
                            </h1>
                            <h1 className="font-kanit text-xl truncate">{movie?.release_date || movie?.first_air_date}</h1>
                            {/* <p className="font-kanit text-lg overview">{movie?.overview}</p> */}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActorCard;