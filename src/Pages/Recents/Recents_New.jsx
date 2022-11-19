import { useEffect, useState } from 'react';
import './Recents.scss';
import useRecents from '../../Contexts/useRecents';
import Navbar from '../../Components/Navbar/Navbar';
import { API_KEY, POSTER_URL, TMDB_URL } from '../../Constants/Constants';
import LazyImage from '../../Components/LazyImage';
import axios from 'axios';
import useTmdbApi from '../../Services/tmdb_Api';
import { useRef } from 'react';

const RecentsNew = () => {
    const { getMovie, movieData, cast, production, genres, error, failed } = useTmdbApi();
    const [movie, setMovie] = useState({});
    const [playerScreen, setPlayerScreen] = useState({
        width: 360,
        height: 280
    });
    const [trailers, setTrailers] = useState({
        isActive: false,
        list: [],
        data: {}
    });
    const { recents } = useRecents();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState({
        trailer: {
            active: false,
            msg: "",
            err: {}
        }
    });
    const scrollRef = useRef();

    const playTrailer = async (id) => {
        setLoading(true);
        const controller = new AbortController();
        try {
            const { data } = await
                axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`, { signal: controller.signal });
            controller.abort("data fetch success");
            if (data?.results?.length) {
                let v = Math.floor(Math.random() * data.results.length);
                console.log(data?.results);
                setTrailers((curr) => ({ ...curr, list: data.results, data: data?.results[v], isActive: true }));
                setTimeout(() => {
                    const view = document.getElementById('watchTrailer');
                    view && view.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    setLoading(false);
                    return;
                }, 1500);
            } else {
                let reason = "There are no related videos available!";
                setLoading(false);
                console.log("No videos Available");
                setErr((curr) => ({ ...curr, trailer: { active: true, msg: reason } }))
                controller.abort("No Videos Available");
            };
        } catch (err) {
            setLoading(false);
            console.log("Error Fetching Trailer", err);
            setErr((curr) => ({ ...curr, trailer: { active: true, msg: err?.message, err: err } }))
            controller.abort("Error Occured");
        };
    };

    const handleChange = () => {
        let isAvailable = trailers.list?.length >= 1;
        console.log(isAvailable);
        if (isAvailable) {
            let v = Math.floor(Math.random() * trailers?.list?.length);
            setTrailers((curr) => ({ ...curr, data: curr?.list[v] }));
            return;
        } else { return false; };
    };

    const addToWishlist = (data) => {
        console.log("add to wishlist");
        console.log(movieData);
    };

    const fetchDetails = async (data) => {
        const values = await getMovie(data);
        console.log("values after fetching", values);
    };

    const handleScroll = (param) => {
        switch (param) {
            case "next":
                scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollLeft + 200,
                    behavior: "smooth"
                });
                break;
            case "prev":
                scrollRef.current.scrollTo({
                    left: scrollRef.current.scrollLeft - 200,
                    behavior: "smooth"
                });
                break;
            default:
                break;
        };
    };

    useEffect(() => {
        console.log(recents);
        if (window.innerWidth <= 640) {
            setPlayerScreen({
                width: window.innerWidth - 10,
                height: window.innerHeight / 2 - 10
            });
        } else {
            setPlayerScreen({
                width: window.innerWidth - 10,
                height: window.innerHeight - 10
            });
        };
        recents?.length !== 0 && setMovie(recents[0]);
    }, []);

    return (
        <> <Navbar />
            <div className='recentBg0 pt-20'
                style={{ backgroundImage: `url(${(POSTER_URL + movie?.backdrop_path) || ""})` }}>
                <div className="flex flex-row flex-wrap p-3 gap-2 lg:items-start lg:justify-start lg:text-start
                 md:items-center md:justify-center md:text-center sm:items-center sm:justify-center sm:text-center">
                    <div className='sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px]'>
                        <LazyImage url={POSTER_URL + movie?.poster_path || movie?.backdrop_path || ""}
                            className="w-auto h-auto rounded-2xl" />
                    </div>
                    {movie?.id && <div className="sm:w-full md:w-1/2 lg:w-1/2 min-w-[280px] ml-4">
                        <div className="md:max-w-[480px]">
                            <h1 className='text-4xl font-righteous py-1'>{movie?.title || movie?.original_title || ""}</h1>
                            <h3 className='text-2xl font-kanit py-2'>{movie?.release_date || movie?.first_air_date}</h3>
                            <h2 className='text-xl font-kanit py-1 '>{movie?.overview}</h2>
                            <h4>{movie?.popularity}</h4>
                            <div className="rating flex flex-row items-center text-center min-[220px]:justify-center lg:justify-start">
                                <i className="ri-star-s-fill text-3xl py-2"></i>
                                <h4 className='text-3xl py-2 font-kanit'>&nbsp;{String(movie?.vote_average)?.slice(0, 3)}
                                    <span className='text-base text-gray-500'>&nbsp;({movie?.vote_count})</span>
                                </h4>
                            </div>
                        </div>
                        <div className="gap-2">
                            <button className='p-2 my-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600
                             text-white disabled:line-through disabled:hover:bg-inherit'
                                onClick={e => playTrailer(movie?.id)} disabled={trailers.isActive}>
                                Watch Trailer</button>
                            <button className='p-2 my-2 ml-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600 text-white'
                                onClick={e => addToWishlist(movie)}> Add to Watch</button>
                            <button className='p-2 my-2 ml-2 rounded-lg bg-white bg-opacity-10 hover:bg-emerald-600 text-white'
                                onClick={e => fetchDetails(movie)}>More Details</button>
                        </div>
                        <div className='genreWrapper flex flex-row flex-wrap gap-3'>
                            {genres?.map((genre, i) => (
                                <p key={i} className={`p-2 rounded-2xl font-kanit text-base bg-gradient-to-tr from-yellow-200
                                 via-orange-500 to-amber-900 `}>{genre?.name}</p>
                            ))}
                        </div>
                        {failed && <div className='w-1/2'>
                            <p className='font-kanit text-red-600'>{error?.message}</p>
                            <p className='font-kanit text-red-600'>{error?.response?.data?.status_message}</p>
                        </div>}
                        {err?.trailer?.active && <div className='w-1/2'>
                            <p className='font-kanit text-red-600'>{err?.trailer?.msg}</p>
                            <p className='font-kanit text-red-600'>{err?.trailer?.err?.code}</p>
                        </div>}
                        {loading && <div className='w-full py-2'>
                            <div className='load'><div> <h5 className='text-xl font-righteous text-center text-black'>
                                Loading...</h5>
                            </div></div>
                        </div>}
                    </div>}
                </div>
                {cast?.length >= 1 &&
                    (<div className='w-full px-3 relative'>
                        <h2 className='font-righteous text-2xl py-2 ml-4'>Top Cast &nbsp;
                            <span className='py-1 px-2 bg-green-700 font-poppins text-sm rounded-md '>{cast?.length}</span>
                        </h2>
                        <div ref={scrollRef} className='w-full h-auto flex overflow-x-auto overflow-y-hidden castArea'>
                            <div className=''>
                                <button onClick={e => handleScroll("prev")} onMouseEnter={e => handleScroll("prev")}
                                    className='absolute top-0 bottom-0 text-2xl left-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                    <i className="ri-arrow-left-s-line"></i> </button>
                                <button onClick={e => handleScroll("next")} onMouseEnter={e => handleScroll("next")}
                                    className='absolute top-0 bottom-0 text-2xl right-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                    <i className="ri-arrow-right-s-line "></i> </button>
                            </div>
                            {cast?.map((person, i) => (
                                <div className='mx-1 p-3'>
                                    <LazyImage key={i} url={`https://image.tmdb.org/t/p/w300${person?.profile_path}`}
                                        className="rounded-lg min-w-[164px] h-64 object-cover" />
                                    <span className='text-white text-base truncate'>{person?.name || person?.original_name}</span>
                                    <h4 className='text-gray-400 text-sm truncate'>{person?.character}</h4>
                                </div>
                            ))}
                        </div>
                    </div>)}
                {trailers.isActive && <div id='watchTrailer' className='w-auto h-auto p-2 m-2'>
                    <div className='w-full flex flex-row justify-between text-white'>
                        <button className='text-2xl m-2 roundBtn' onClick={handleChange} >
                            <i className="ri-refresh-fill"></i>
                        </button>
                        <button className='text-2xl m-2 roundBtn' onClick={e => setTrailers(curr => ({ ...curr, isActive: false }))} >
                            <i className="ri-close-circle-fill"></i>
                        </button>
                    </div>
                    {trailers?.list?.length && <div className='w-full flex flex-row items-center flex-wrap p-2
                        justify-center text-center gap-2'>
                        {trailers?.list?.map((video) => (
                            <div key={video.key} className="w-16 items-center justify-center text-center flex h-16 bg-gradient-to-br
                             from-orange-400 to-red-600 cursor-pointer text-white rounded-lg opacity-50 z-50
                             hover:opacity-100 p-3 m-1 text-xs" onClick={e => setTrailers(curr => ({ ...curr, data: video }))}>
                                {video?.type}
                            </div>
                        ))}
                    </div>}
                    <iframe width={(playerScreen?.width) - 20} height={(playerScreen?.height) - 20} allowFullScreen={true}
                        title="mFlux Trailers" src={`https://www.youtube.com/embed/${trailers?.data?.key}?fs=1`}>
                    </iframe>
                </div>}

            </div>
        </>
    );
};

export default RecentsNew;