import { useEffect, useState } from 'react';
import './Recents.scss';
import { useRecents } from '../../Contexts/RecentsProvider';
import Navbar from '../../Components/Navbar/Navbar';
import { POSTER_URL } from '../../Constants/Constants';

const Recents = () => {
    const [movie, setMovie] = useState({});
    const { recents } = useRecents();
    console.log(movie);

    useEffect(() => {
        recents?.length && setMovie(recents[0]);
    }, []);

    return (
        <> <Navbar />
            <div className='recentBg'>
                <h4 className='text-white text-6xl  py-4 text-center'>Recents </h4>
                <hr />
                <div className="itemWrapper">
                    <div className='w-96 h-fit'>
                        <img src={POSTER_URL + movie?.poster_path || movie?.backdrop_path || ""}
                            alt="_poster" className='w-full rounded-lg shadow-lg shadow-slate-400' />
                    </div>
                    <div className="info mx-6 text-white ">
                        <h1 className='text-4xl font-righteous py-1'>{movie?.original_title || movie?.title || ""}</h1>
                        <h3 className='text-2xl font-kanit py-2'>{movie?.release_date || movie?.first_air_date}</h3>
                        <h2 className='text-xl w-96 font-kanit py-1 overflow-hidden'>{movie?.overview}</h2>
                        <h4>{movie?.popularity}</h4>
                        <h4 className='text-4xl font-kanit'><i class="ri-star-half-line"></i>&nbsp;{movie?.vote_average}
                            <span className='text-base'>&nbsp;<i class="ri-star-s-fill"></i>( {movie?.vote_count} )</span>
                        </h4>
                        <h4>{movie?.vote_count}</h4>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Recents;