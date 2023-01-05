import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { image404 } from '../Assets';
import { w780 } from '../Constants/Constants';
import { toastOptions, useFavouritesStore } from '../Services/Store';
import Icon from './Icon';

const ActorPost = ({ actor }) => {
    const addToFav = useFavouritesStore(s => s.addPerson);
    const route = useNavigate();

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url ?? "null");
        toast.info("URL Copied to Clipboard!", toastOptions);
        return true;
    };

    const handleLike = () => {
        // case
        return;
    };

    return (
        <div className="mx-auto mt-4 min-h-[96vh] max-w-[600px] bg-white rounded-md border-[2px] border-white relative overflow-hidden">
            <LazyLoad offset={100}>
                <img src={actor?.profile_path ? (w780 + actor?.profile_path) : image404} alt="poster"
                    className="w-full min-h-[82vh] object-cover" />
            </LazyLoad>
            <article className="ml-2 mt-1 text-left">

                <div className="flex flex-row items-center gap-2 justify-between font-semibold">
                    <div className="flex flex-row items-center gap-2 text-base">
                        <span className="text-overflow max-w-[390px] text-slate-800">{actor?.name ?? ""}</span>
                    </div>
                    {/* <span className="mr-1 truncate ">{movie?.release_date ?? movie?.first_air_date}</span> */}
                </div>

                <span className="text-overflow-2 font-semibold text-sm mb-1 text-gray-600 max-w-[98%]">
                    {actor?.known_for_department ?? ""}
                </span>

                <div className=" font-semibold text-sm flex flex-row items-center gap-2 ">
                    <Icon onClick={handleShare} icon="material-symbols:share-reviews" size={30}
                        classes="opacity-100 text-[#ffab3d] hover:text-[#f81212]" />
                    <span className="text-sm flex text-gray-500">
                        <Icon icon="mdi:message-star" color="#fd8f00" size={18} />&nbsp;{String(actor?.popularity)?.slice(0, 4) ?? 0}
                    </span>
                    <div className="absolute right-2 bottom-1 flex flex-row gap-1">
                        <Icon size={28} hover={1}
                            title="Add to Favourites"
                            classes="text-rose-600"
                            onClick={() => addToFav(actor)} />
                        <Icon size={27}
                            classes="text-green-600 hover:text-green-500"
                            icon="ic:baseline-open-in-new"
                            title="Open"
                            onClick={() => route(`/actor-details/${actor?.id}`)} />

                    </div>
                </div>

            </article>
        </div>
    );
};

export default ActorPost;