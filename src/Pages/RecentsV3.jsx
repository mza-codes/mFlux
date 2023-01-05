import { useEffect, useMemo, useState } from 'react';
import useRecents from '../Contexts/useRecents';
import Navbar from '../Components/Navbar/Navbar';
import { POSTER_URL } from '../Constants/Constants';
import useTmdbApi, { controller } from '../Services/tmdb_Api';
import { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import useWatchlist from '../Services/Store';
import Suggestions from '../Components/Suggestions';
import { hooker } from '../Utils/tmdb';
import { image404 } from '../Assets';
import { ActorSmallPhoto } from '../Components/SmallPhoto';
import CrewSmallPhoto from '../Components/SmallPhoto';
import LazyLoad from 'react-lazy-load';
import Slider from 'react-slick';

const colors = ["#b0e48c", "#c1e56c", "#d2e84c", "#e3e38c", "#f4e98c", "#g2e36c", "#b4e78c", "#b8e25c",
    "#b8e48c", "#b9e48c", "#b0e18c", "#b0e42c", "#b0e43c"];

let v = 0;

const RecentsV3 = () => {
    console.count("Rendered component");
    const { id } = useParams();
    const { state } = useLocation();
    const route = useNavigate();

    const movieData = hooker("movieData", useTmdbApi);
    const cast = hooker("cast", useTmdbApi);
    const genres = hooker("genres", useTmdbApi);
    const suggestions = hooker("suggestions", useTmdbApi);
    const videos = hooker("trailers", useTmdbApi);
    const error = useTmdbApi(s => s.error);
    const failed = useTmdbApi(s => s.failed);
    const getTv = hooker("getTv", useTmdbApi);
    const getSuggestions = hooker("getSuggestions", useTmdbApi);
    const getMovie = hooker("getMovie", useTmdbApi);
    const addToWatchList = useWatchlist(s => s.addToWatchList);
    const addOne = useRecents(s => s.addOne);

    const [movie, setMovie] = useState({});

    const scrollRef = useRef();
    const crewScroll = useRef();

    const crew = useMemo(() => movieData?.credits?.crew?.filter((person) => {
        return (person.known_for_department === "Directing" || "Production") ||
            person?.job === ("Director" || "Producer") || person?.department === ("Directing" || "Production")
    }) || [], [movieData]);

    const playTrailer = () => {
        if (videos?.length) {
            let v = Math.floor(Math.random() * videos.length);
            setTimeout(() => {
                const view = document.getElementById('watchTrailer');
                view && view.scrollIntoView({ behavior: 'smooth', block: 'end' });
                return;
            }, 1500);
        } else {
            let reason = "There are no related videos available!";
            return false;
        };
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
        route(`/actor-details/${person?.id}`, { state: state });
        return true;
    };

    const fetchMovie = async () => {
        if (movieData?.id === parseInt(id)) {
            console.warn("Matched with currentMovie");
            setMovie(movieData);
            return true;
        };
        if (state === "tv") {
            const data = await getTv({ id });
            setMovie(data);
            getSuggestions({ genreId: data?.genres[v]?.id, type: state });
            return;
        };
        const data = await getMovie({ id });
        setMovie(data);
        getSuggestions({ genreId: data?.genres[v]?.id });
        return;
    };

    const getFunc = async (data) => {
        addOne(data);
        if (state === "tv") {
            const newItem = await getTv(data);
            setMovie(newItem);
        } else {
            const newMovie = await getMovie({ ...data });
            setMovie(newMovie);
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
    };

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className='control-btn hover:text-[#202020]' onClick={onClick}>
                <button className='next'>
                    <iconify-icon icon="material-symbols:chevron-right-rounded" width="50" height="50" />
                </button>
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className='control-btn hover:text-[#fff]' onClick={onClick} >
                <button className='prev'>
                    <iconify-icon icon="material-symbols:chevron-left-rounded" width="50" height="50" />
                </button>
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    useEffect(() => {
        fetchMovie();
        return () => controller?.abort();
    }, [id]);

    if (!movieData?.id || !id) {
        return (
            <Loading
                err={`Movie with ID: ${id ?? movieData?.id ?? "undefined"} Not Found!`}
                msg={`Please try Refreshing the page or Navigate to Home!`}
            />
        );
    };

    return (
        <main className='text-white'>
            <Navbar />

            {movie?.backdrop_path ?
                <section className='bannerImg relative'>
                    <LazyLoad offset={100}>
                        <img className='movieBanner xl:max-h-[100vh] lg:max-h-[100vh] max-h-[60vh]'
                            src={(POSTER_URL + movie?.backdrop_path)}
                            alt="movie_banner"
                        />
                    </LazyLoad>
                    <div className="fade_bottom"></div>
                </section> : <div className='pt-20'></div>}

            <section className="flex flex-row flex-wrap p-3 gap-2 text-center items-center justify-center lg:items-start 
                lg:justify-start lg:text-start xl:items-start xl:justify-start xl:text-start
                 md:items-center md:justify-center md:text-center sm:items-center sm:justify-center sm:text-center">
                <LazyLoad className="sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px]" offset={100}>
                    <img src={movie?.poster_path ? (POSTER_URL + movie?.poster_path) :
                        movie?.backdrop_path ? (POSTER_URL + movie?.backdrop_path) : image404}
                        className="w-auto h-auto rounded-2xl aspect-[2/3]" />
                </LazyLoad>
                {movie?.id && <div className="sm:w-full md:w-1/2 lg:w-1/2 min-w-[280px] ml-4">
                    <main>
                        <h1 className='text-4xl font-righteous py-1'>{movie?.title || movie?.original_title || movie?.name || ""}</h1>
                        <h3 className='text-2xl font-kanit py-2'>{movie?.release_date || movie?.first_air_date}</h3>
                        <h2 className='text-xl font-kanit py-1 max-h-[40vh] overflow-y-hidden'>{movie?.overview}</h2>
                        <h4 className='font-righteous'>{movieData?.runtime && movieData?.runtime + " Minutes"}</h4>
                        <div className="rating flex flex-row items-center text-center min-[220px]:justify-center lg:justify-start">
                            <i className="ri-star-s-fill text-3xl py-2 text-amber-500"></i>
                            <h4 className='text-3xl py-2 font-kanit'>&nbsp;{String(movieData?.vote_average)?.slice(0, 3)}
                                <span className='text-base text-gray-500'>&nbsp;({movieData?.vote_count})</span>
                            </h4>
                        </div>

                        <div className=''>
                            <a href={`https://imdb.com/title/${movieData?.imdb_id}`} target="_blank" rel="noreferrer"
                                className="text-amber-400 hover:text-yellow-600">
                                <iconify-icon icon="fa:imdb" width={34} height={34} />
                            </a>
                        </div>
                    </main>

                    <div className="gap-2">
                        <button className='p-2 my-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600
                             text-white disabled:line-through disabled:hover:bg-inherit'
                            onClick={playTrailer} >
                            Watch Trailer</button>
                        <button className='p-2 my-2 ml-2 rounded-md bg-white bg-opacity-10 hover:bg-orange-600 text-white'
                            onClick={e => addToWatchList(movieData)}> Add to Watch</button>
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

                </div>}
            </section>

            {/* Cast Section Scrollable */}
            {cast?.length >= 1 &&
                (<div className='w-full px-3 relative'>
                    <h2 className='font-righteous text-2xl py-2 ml-4'>Top Cast &nbsp;
                        <span className='py-1 px-2 bg-green-700 font-poppins text-sm rounded-md '>{cast?.length}</span>
                    </h2>
                    <div ref={scrollRef} className='w-full max-h-64 h-auto flex overflow-x-auto overflow-y-hidden'>
                        <Slider {...settings}>
                            {cast?.slice(0, 25).map((person, i) => (
                                <ActorSmallPhoto
                                    person={person}
                                    onClick={e => fetchPerson(person)}
                                    key={(parseInt(person?.id) * i) - i || person?.id || person?.credit_id}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>)}

            {/* Crew Section Scrollable */}
            {crew?.length >= 1 &&
                (<div className='w-full px-3 relative'>
                    <h2 className='font-righteous text-2xl py-2 ml-4'>Crew &nbsp;
                        <span className='py-1 px-2 bg-green-700 font-poppins text-sm rounded-md '>{crew?.length}</span>
                    </h2>
                    <div ref={crewScroll} className='w-full max-h-64 h-auto flex overflow-x-auto overflow-y-hidden'>
                        <Slider {...settings}>
                            {crew?.map((person, i) => (
                                <CrewSmallPhoto
                                    key={(parseInt(person?.id) * i) - i || person?.id || person?.credit_id}
                                    person={person}
                                    onClick={e => fetchPerson(person)} />
                            ))}
                        </Slider>
                    </div>
                </div>)}
                
            {movieData?.id && cast?.length <= 0 && <div className='w-full text-center'>
                <p className='font-kanit text-2xl'>There is no cast information available</p></div>}
            
            
            {suggestions?.length > 0 &&
                <Suggestions getFunc={getFunc} genres={genres} currentGenre={v} state={state} />
            }

        </main>
    );
};

export default RecentsV3;