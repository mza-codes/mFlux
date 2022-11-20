import { w500 } from '../Constants/Constants';
import LazyImage from './LazyImage';
import defImage from '../Assets/default.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useTmdbApi from '../Services/tmdb_Api';

const ErrMsg = ({ route }) => (
    <>
        <h1 className='text-rose-600 text-4xl text-center font-kanit'>
            This page does not seems to exist or unable to fetch actor details!
        </h1>
        <h2 onClick={route} className='text-2xl text-green-500 cursor-pointer 
            text-center py-3 font-kanit font-medium flex justify-center hover:text-amber-600'>
            <iconify-icon icon="ic:round-arrow-circle-left" width="33" height="33" /> &nbsp;Go Back</h2>
    </>
)

const ActorBio = ({ actor }) => {
    const { getMoviesByActorId } = useTmdbApi();
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/recents', { replace: true });
        return;
    };

    useEffect(() => {
        console.log("inside useEffect");
        if (actor?.id || actor?.name) {
            console.log("inside actor true,function calling...");
            getMoviesByActorId(actor);
        };
    }, [actor]);

    if (!actor?.id || !actor?.name) { return <ErrMsg route={goBack} /> };
    return (
        <div className='w-full text-white py-6'>
            <div className="actorWrapper flex flex-row flex-wrap justify-evenly ">
                <div className="actorImage sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px] p-3 max-h-[70vh]">
                    <LazyImage url={actor?.profile_path ? w500 + actor?.profile_path : defImage}
                        className="w-auto rounded-3xl" />
                </div>
                <div className="profile min-w-[280px] max-w-[50vw] flex flex-col mx-4 items- justify-center ">
                    <h1 className='text-5xl text-zinc-200 font-righteous py-1' >{actor?.name}</h1>
                    <h2 className='text-3xl text-zinc-300 font-righteous py-1' >{actor?.place_of_birth}</h2>
                    <p className='text-3xl text-slate-300 font-righteous py-1' >{actor?.birthday && "Birthday: " + actor?.birthday}</p>
                    {actor?.known_for_department &&
                        <h3 className='text-2xl text-gray-300 font-righteous py-1' >Profession: {actor?.known_for_department}</h3>}
                    <div className='links flex flex-row gap-3'>
                        <a href={`https://www.imdb.com/name/${actor?.imdb_id}`} rel="noreferrer" target="_blank"
                            className='text-xl text-yellow-600 font-righteous py-1 uppercase' >
                            <iconify-icon icon="fa:imdb" width="33" height="33" /> </a>
                        {actor?.homepage && <a href={`${actor?.homepage}`} rel="noreferrer" target="_blank"
                            className='text-xl text-blue-500 font-righteous py-1 uppercase' >
                            <iconify-icon icon="dashicons:admin-site" width="33" height="33" /> </a>}
                    </div>
                    <p className='text-xl text-gray-400 py-2 font-kanit font-light '>
                        {actor?.biography?.length > 800 ? actor?.biography?.slice(0, 904) + "..."
                            : actor?.biography || "No Biography Found"}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default ActorBio