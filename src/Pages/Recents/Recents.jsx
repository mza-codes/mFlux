import { useEffect, useState } from 'react';
import './Recents.scss';
import { useRecents } from '../../Contexts/RecentsProvider';
import Navbar from '../../Components/Navbar/Navbar';
import { API_KEY, POSTER_URL, TMDB_URL } from '../../Constants/Constants';
import LazyImage from '../../Components/LazyImage';
import axios from 'axios';

const Recents = () => {
    const [movie, setMovie] = useState({});
    const [playerScreen, setPlayerScreen] = useState({
        width: 360,
        height: 280
    });

    const { recents } = useRecents();
    console.log(movie);

    const playTrailer = async (id) => {
        try {
            const { data } = await axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
            if (data?.results?.length) {
                // case
                console.log(data?.results);
            } else {
                console.log("No videos Available");
            };
        } catch (err) {
            console.log("Error Fetching Trailer", err);
        };
    };

    useEffect(() => {
        setPlayerScreen({
            width: window.innerWidth - 10,
            height: window.innerHeight / 2 - 10
        });
        recents?.length && setMovie(recents[0]);
    }, []);

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         // console.log("SIZE", window.innerWidth, "x", window.innerHeight / 2);
    //         setPlayerScreen({
    //             width: window.innerWidth - 10,
    //             height: window.innerHeight / 2 - 10
    //         });
    //     });

    //     return () => {
    //         window.removeEventListener('resize', () => true);
    //     };

    // }, []);


    return (
        <> <Navbar />
            <div className='recentBg pt-20'>
                <div className="itemWrapper0 flex flex-wrap flex-row p-3">
                    <div className='sm:1/2 md:w-full lg:w-1/2 h-auto moviePoster0'>
                        <LazyImage url={POSTER_URL + movie?.poster_path || movie?.backdrop_path || ""} />
                    </div>
                    {movie && <div className="info0 m-6 text-white ">
                        <h1 className='text-4xl font-righteous py-1'>{movie?.original_title || movie?.title || ""}</h1>
                        <h3 className='text-2xl font-kanit py-2'>{movie?.release_date || movie?.first_air_date}</h3>
                        <h2 className='text-xl w-96 font-kanit py-1 overflow-hidden'>{movie?.overview}</h2>
                        <h4>{movie?.popularity}</h4>
                        <h4 className='text-4xl font-kanit'><i className="ri-star-s-fill"></i>
                        &nbsp;{String(movie?.vote_average)?.slice(0, 3)}
                            <span className='text-base text-gray-500'>&nbsp;({movie?.vote_count})</span>
                        </h4>
                        <div className="buttons gap-2">
                            <button className='p-2 my-2 rounded-md bg-white bg-opacity-10 hover:bg-lime-800 text-white'
                                onClick={e => playTrailer(movie?.id)}>
                                Watch Trailer</button>
                            <button className='p-2 my-2 ml-2 rounded-md bg-white bg-opacity-10 hover:bg-lime-800 text-white'
                            >
                                Add to Watch</button>
                        </div>
                    </div>}
                </div>
                <div className='w-auto h-auto p-2 m-2'>
                    <iframe width={(playerScreen?.width) - 20} height={(playerScreen?.height) - 20}
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>

            </div>
        </>
    );
};

export default Recents;