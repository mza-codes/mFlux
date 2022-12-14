import { image404 } from "../Assets";
import { w780 } from "../Constants/Constants";
import { useFavouritesStore } from "../Services/Store";
import LazyImage from "./LazyImage";

const ActorCard = ({ actor, hide, ...props }) => {

    const addPerson = useFavouritesStore(s => s.addPerson);

    return (
        <div className="imageContainer max-h-screen max-w-xs m-4 ">
            <div className="image w-64 sm:w-full sm:h-full relative resultImg z-[102]">
                <LazyImage alt="_loading" className="rounded-xl object-cover w-64 "
                    url={actor?.profile_path ? (w780 + actor?.profile_path) : image404} />
                {!hide &&
                    <div className="icon text-rose-600 hover:text-rose-500 z-[104] 
                    cursor-pointer absolute right-2 top-2" onClick={() => addPerson(actor)} >
                        <iconify-icon icon="mdi:favourite" width={36} height={36} />
                    </div>}
                <div {...props} className="absolute text-white text-center text">
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