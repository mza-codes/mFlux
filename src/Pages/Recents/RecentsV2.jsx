import { useEffect, useState } from 'react';
import './Recents.scss';
import useRecents from '../../Contexts/useRecents';
import Navbar from '../../Components/Navbar/Navbar';
import { POSTER_URL } from '../../Constants/Constants';
import LazyImage from '../../Components/LazyImage';
import useTmdbApi from '../../Services/tmdb_Api';
import { useRef } from 'react';
import defImage from '../../Assets/default.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import ErrorBar from '../../Components/ErrorBar';
import defaultImg from '../../Assets/default.jpg';
import Loading from '../Loading';
import MovieCard from '../../Components/MovieCard';
import useWatchlist from '../../Services/Store';

const colors = ["#b0e48c", "#c1e56c", "#d2e84c", "#e3e38c", "#f4e98c", "#g2e36c", "#b4e78c", "#b8e25c",
    "#b8e48c", "#b9e48c", "#b0e18c", "#b0e42c", "#b0e43c"];

const RecentsV2 = () => {
    const { getMovie, movieData, cast, genres, error, failed,
        getSuggestions, suggestions, trailers: videos } = useTmdbApi();
    const { addOne } = useRecents();
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailers, setTrailers] = useState({
        isActive: false,
        list: [],
        data: {}
    });
    const [err, setErr] = useState({
        trailer: {
            active: false,
            msg: "",
            err: {}
        }
    });
    const addToWatchList = useWatchlist(s => s.addToWatchList);
    const scrollRef = useRef();
    const crewScroll = useRef();
    const route = useNavigate();
    const crew = movieData?.credits?.crew?.filter((person) => {
        return (person.known_for_department === "Directing" || "Production") ||
            person?.job === ("Director" || "Producer") || person?.department === ("Directing" || "Production")
    }) || [];

    const playTrailer = () => {
        if (videos?.length) {
            let v = Math.floor(Math.random() * videos.length);
            setTrailers((curr) => ({ ...curr, list: videos, data: videos[v], isActive: true }));
            setTimeout(() => {
                const view = document.getElementById('watchTrailer');
                view && view.scrollIntoView({ behavior: 'smooth', block: 'end' });
                return;
            }, 1500);
        } else {
            let reason = "There are no related videos available!";
            console.log("No videos Available");
            setErr((curr) => ({ ...curr, trailer: { active: true, msg: reason } }))
            return false;
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
        // console.log("add to wishlist");
        // console.log(movieData);
        addToWatchList(data);
        return true;
    };

    const handleScroll = (param, ref) => {
        if (param === "next") {
            ref.current.scrollTo({
                left: ref.current.scrollLeft + 200,
                behavior: "smooth"
            });
            return;
        } else if (param === "prev") {
            ref.current.scrollTo({
                left: ref.current.scrollLeft - 200,
                behavior: "smooth"
            });
            return;
        };
    };

    const fetchPerson = (person) => {
        route(`/actor-details/${person?.id}`, { state: true });
        return true;
    };

    const fetchMovie = async () => {
        if (movieData?.id === parseInt(id)) {
            console.log("Matched with currentMovie");
            setMovie(movieData);
            return true;
        };
        const data = await getMovie({ id });
        setMovie(data);
        let v = Math.floor(Math.random() * data?.genres?.length);
        getSuggestions({ genreId: data?.genres[v]?.id });
        return;
    };

    const getFunc = async (data) => {
        console.log("getfunc called", data);
        addOne(data);
        const newMovie = await getMovie(data);
        setMovie(newMovie);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    if (!movie?.id || !id) {
        return (
            <Loading err={"No Movie Found!"} msg={"Please try Refreshing the page or Navigate to Home!"} />
        )
    };

    return (
        <main className='text-white'>
            <Navbar />
            {(err?.trailer?.active && failed) && <ErrorBar err={error?.message || err?.trailer?.msg} />}
            {movie?.backdrop_path ?
                <section className='bannerImg relative'>
                    <img className='movieBanner xl:max-h-[100vh] lg:max-h-[100vh] md:max-h-[60vh] sm:max-h-[60vh]'
                        src={(POSTER_URL + movie?.backdrop_path)} alt="movie_banner" />
                    <div className="fade_bottom"></div>
                </section> : <div className='pt-20'></div>}

            <section className="flex flex-row flex-wrap p-3 gap-2 text-center items-center justify-center lg:items-start 
                lg:justify-start lg:text-start xl:items-start xl:justify-start xl:text-start
                 md:items-center md:justify-center md:text-center sm:items-center sm:justify-center sm:text-center">
                <div className='sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px]'>
                    <LazyImage url={movie?.poster_path || movie?.backdrop_path ?
                        (POSTER_URL + movie?.poster_path || movie?.backdrop_path) : defaultImg}
                        className="w-auto h-auto rounded-2xl aspect-[2/3]" />
                </div>
                {movie?.id && <div className="sm:w-full md:w-1/2 lg:w-1/2 min-w-[280px] ml-4">
                    <main>
                        <h1 className='text-4xl font-righteous py-1'>{movie?.title || movie?.original_title || ""}</h1>
                        <h3 className='text-2xl font-kanit py-2'>{movie?.release_date || movie?.first_air_date}</h3>
                        <h2 className='text-xl font-kanit py-1 max-h-[40vh] overflow-y-hidden'>{movie?.overview}</h2>
                        <h4 className='font-righteous'>{movieData?.runtime && movieData?.runtime + " Minutes"}</h4>
                        <div className="rating flex flex-row items-center text-center min-[220px]:justify-center lg:justify-start">
                            <i className="ri-star-s-fill text-3xl py-2 text-amber-500"></i>
                            <h4 className='text-3xl py-2 font-kanit'>&nbsp;{String(movie?.vote_average)?.slice(0, 3)}
                                <span className='text-base text-gray-500'>&nbsp;({movie?.vote_count})</span>
                            </h4>
                        </div>
                        {/* <div className=''> */}
                        <div className=''>
                            <a href={`https://imdb.com/title/${movieData?.imdb_id}`} target="_blank" rel="noreferrer"
                                className="text-amber-400 hover:text-yellow-600">
                                <iconify-icon icon="fa:imdb" width={34} height={34} />
                            </a>
                        </div>
                        {/* </div> */}
                    </main>
                    <div className="gap-2">
                        <button className='p-2 my-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600
                             text-white disabled:line-through disabled:hover:bg-inherit'
                            onClick={playTrailer} disabled={trailers.isActive}>
                            Watch Trailer</button>
                        <button className='p-2 my-2 ml-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600 text-white'
                            onClick={e => addToWishlist(movie)}> Add to Watch</button>
                    </div>
                    <div className='space-x-2 space-y-2'>
                        {genres?.map((genre, i) => (
                            <button key={genre?.id || i} className={`p-2 rounded-md font-semibold text-base bg-gradient-to-tr
                                 from-orange-300 via-amber-300 to-indigo-300 text-black 
                                 hover:bg-gradient-to-tl`}>{genre?.name}</button>
                        ))}
                    </div>
                    <div className='py-1 flex flex-wrap flex-row xl:justify-start lg:justify-start justify-center '>
                        {movieData?.production_companies?.map((data, i) => (
                            <span key={data?.name} style={{ color: `${colors[i]}` }} >#{data?.name} &nbsp;</span>
                        ))}
                        {movieData?.production_countries[0]?.name &&
                            <span className='text-orange-300' >#{movieData?.production_countries[0]?.name} &nbsp;</span>}
                        {movieData?.spoken_languages[0]?.name &&
                            <span className='text-orange-500' >#{movieData?.spoken_languages[0]?.name}</span>}
                    </div>
                    {failed &&
                        <div className='w-[90%] lg:w-1/2'>
                            <p className='font-kanit red'>{error?.message}</p>
                            <p className='font-kanit red'>{error?.response?.data?.status_message}</p>
                        </div>}
                    {err?.trailer?.active &&
                        <div className='w-[90%] lg:w-1/2'>
                            <p className='font-kanit red'>{err?.trailer?.msg}</p>
                            <p className='font-kanit red'>{err?.trailer?.err?.code}</p>
                        </div>}
                </div>}
            </section>

            {/* Cast Section Scrollable */}
            {cast?.length >= 1 &&
                (<div className='w-full px-3 relative'>
                    <h2 className='font-righteous text-2xl py-2 ml-4'>Top Cast &nbsp;
                        <span className='py-1 px-2 bg-green-700 font-poppins text-sm rounded-md '>{cast?.length}</span>
                    </h2>
                    <div ref={scrollRef} className='w-full h-auto flex overflow-x-auto overflow-y-hidden castArea'>
                        <div className=''>
                            <button onClick={e => handleScroll("prev", scrollRef)} onMouseEnter={e => handleScroll("prev", scrollRef)}
                                className='absolute top-0 bottom-0 text-2xl left-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                <i className="ri-arrow-left-s-line"></i> </button>
                            <button onClick={e => handleScroll("next", scrollRef)} onMouseEnter={e => handleScroll("next", scrollRef)}
                                className='absolute top-0 bottom-0 text-2xl right-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                <i className="ri-arrow-right-s-line "></i> </button>
                        </div>
                        {cast?.slice(0, 25).map((person, i) => (
                            <div className='mx-1 p-3 cursor-pointer hover:scale-105 transition-all ease-linear'
                                onClick={e => fetchPerson(person)}
                                key={(parseInt(person?.id) * i) - i || person?.id || person?.credit_id} >
                                <LazyImage key={i} url={person?.profile_path ?
                                    `https://image.tmdb.org/t/p/w300${person?.profile_path}` : defImage}
                                    className="rounded-lg min-w-[124px] max-h-[150px] object-cover aspect-square" />
                                <span className='text-white text-base max-w-[100%]'>{person?.name || person?.original_name}</span>
                                <h4 className='text-gray-400 text-sm max-w-[100%]'>{person?.character}</h4>
                            </div>
                        ))}
                    </div>
                </div>)}

            {/* Crew Section Scrollable */}
            {crew?.length >= 1 &&
                (<div className='w-full px-3 relative'>
                    <h2 className='font-righteous text-2xl py-2 ml-4'>Crew &nbsp;
                        <span className='py-1 px-2 bg-green-700 font-poppins text-sm rounded-md '>{crew?.length}</span>
                    </h2>
                    <div ref={crewScroll} className='w-full h-auto flex overflow-x-auto overflow-y-hidden castArea'>
                        <div className=''>
                            <button onClick={e => handleScroll("prev", crewScroll)} onMouseEnter={e => handleScroll("prev", crewScroll)}
                                className='absolute top-0 bottom-0 text-2xl left-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                <i className="ri-arrow-left-s-line"></i> </button>
                            <button onClick={e => handleScroll("next", crewScroll)} onMouseEnter={e => handleScroll("next", crewScroll)}
                                className='absolute top-0 bottom-0 text-2xl right-0 text-orange-200 
                                     hover:text-black rounded-2xl hover:bg-white hover:opacity-50' >
                                <i className="ri-arrow-right-s-line "></i> </button>
                        </div>
                        {crew?.map((person, i) => (
                            <div className='mx-1 p-3 cursor-pointer hover:scale-105 transition-all ease-linear'
                                onClick={e => fetchPerson(person)} key={(parseInt(person?.id) * i) - i || person?.credit_id} >
                                <LazyImage key={i} url={person?.profile_path ?
                                    `https://image.tmdb.org/t/p/w300${person?.profile_path}` : defImage}
                                    className="rounded-lg min-w-[124px] max-h-[150px] object-cover aspect-square " />
                                <span className='text-white text-base max-w-[100%]'>{person?.name || person?.original_name}</span>
                                <h4 className='text-gray-400 text-sm max-w-[100%]'>{person?.job || person?.known_for_department
                                    || person?.department}</h4>
                            </div>
                        ))}
                    </div>
                </div>)}
            {movieData?.id && cast?.length <= 0 && <div className='w-full text-center'>
                <p className='font-kanit text-2xl'>There is no cast information available</p></div>}
            {/* Trailer Using current innerwidth values */}
            {trailers.isActive &&
                <div id='watchTrailer' className='w-auto h-auto'>
                    <div className='w-full flex flex-row justify-between text-white'>
                        <button className='text-2xl m-2 roundBtn' onClick={handleChange} >
                            <i className="ri-refresh-fill"></i>
                        </button>
                        <button className='text-2xl m-2 roundBtn' onClick={e => setTrailers(curr => ({ ...curr, isActive: false }))} >
                            <i className="ri-close-circle-fill"></i>
                        </button>
                    </div>
                    {trailers?.list?.length &&
                        <div className='w-full flex flex-row items-center flex-wrap p-2
                        justify-center text-center gap-2'>
                            {trailers?.list?.map((video) => (
                                <div key={video.key} className="w-16 items-center justify-center text-center flex h-16 
                                    bg-gradient-to-br  from-orange-400 to-red-600 cursor-pointer text-white rounded-lg 
                                    opacity-50 z-50 hover:opacity-100 p-3 m-1 text-xs"
                                    onClick={e => setTrailers(curr => ({ ...curr, data: video }))}>
                                    {video?.type}
                                </div>
                            ))}
                        </div>}
                    <div className="w-full flex items-center justify-center text-center p-1 m-0 ">
                        <iframe allowFullScreen={true} style={{ width: "100%", height: "100%" }}
                            title="Movie Trailers" src={`https://www.youtube.com/embed/${trailers?.data?.key}?fs=1`}>
                        </iframe>
                    </div>
                </div>}
            {suggestions?.length > 0 &&
                <section className="suggestionSection w-full text-center">
                    <h3 className='text-3xl py-3 font-righteous'>You Might Also Like</h3>
                    <main className="suggestionsWrapper flex flex-row flex-wrap w-full items-center justify-center ">
                        {suggestions?.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie} handleStore={getFunc} />
                        ))}
                    </main>
                </section>
            }

        </main>
    );
};

export default RecentsV2;