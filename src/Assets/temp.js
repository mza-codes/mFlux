const PostModel = () => {
    const movie = useWatchlist(s => s.watchlist?.[1]);
    console.log(movie);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url ?? "null");
        toast.info("URL Copied to Clipboard!", toastOptions);
    };
    return (
        <div className="mx-auto mt-4 h-[96vh] max-w-[600px] bg-white rounded-md border-[2px] border-white relative overflow-hidden">
            <LazyLoad offset={100}>
                <img src={movie?.poster_path ? (w500 + movie?.poster_path) : image404} alt="poster"
                    className="absolute inset-0 w-full h-[88%] object-cover" />
            </LazyLoad>
            <div className="absolute flex flex-row items-center gap-2 bottom-12 left-2 font-semibold text-base">
                {/* <Icon icon={"mdi:favourite"} size={30} color="red" z /> */}
                <Icon icon="mdi:like-outline" size={30} color="#080055" z />
                <span className="font-poppins text-gray-500">
                    {movie?.vote_count?.length > 3 ? movie?.vote_count?.slice(0, 2) + "K" : movie?.vote_count ?? 0}</span>
                <span className="ml-2 text-overflow max-w-[390px]">{movie?.title || movie?.original_title ||
                    movie?.original_name || movie?.name}
                </span>
                <span className="mr-1 truncate ">{movie?.release_date || movie?.first_air_date}</span>
            </div>
            <div className="absolute bottom-2 left-2 font-semibold text-sm flex flex-row items-center gap-2">
                <span className="text-overflow-2 text-gray-600 max-w-[80%]">{movie?.overview}</span>
            </div>
            <div className="absolute bottom-2 right-2 font-semibold text-sm flex flex-row items-center gap-2">
                <Icon onClick={handleShare} icon="material-symbols:share-reviews" size={30}
                    classes="opacity-100 text-[#ffab3d] hover:text-[#f81212]" />
                <span className="text-sm flex text-gray-500">
                    <Icon icon="mdi:message-star" color="#fd8f00" size={18} />&nbsp;{String(movie?.vote_average).slice(0, 3) ?? 0}
                </span>
            </div>
        </div>
    );
};

// export default PostModel;