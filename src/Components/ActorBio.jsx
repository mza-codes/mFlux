import { w500 } from '../Constants/Constants';
import useTmdbApi from '../Services/tmdb_Api'
import LazyImage from './LazyImage';
import defImage from '../Assets/default.jpg';

const ActorBio = () => {
    const { actor } = useTmdbApi();
    return (
        <div className='w-full text-white py-6'>
            <div className="actorWrapper flex flex-row flex-wrap justify-evenly md:flex-row-reverse md:flex-wrap-reverse">
                <div className="profile min-w-[280px] max-w-[50vw] flex flex-col mx-4 items- justify-center max-h-[80vh] overflow-y-hidden">
                    <h1 className='text-5xl text-zinc-200 font-righteous py-1' >{actor?.name}</h1>
                    <h2 className='text-3xl text-zinc-300 font-righteous py-1' >{actor?.place_of_birth}</h2>
                    <p className='text-3xl text-slate-300 font-righteous py-1' >{actor?.birthday && "Birthday: " + actor?.birthday}</p>
                    {actor?.known_for_department &&
                        <h3 className='text-2xl text-gray-300 font-righteous py-1' >Profession: {actor?.known_for_department}</h3>}
                    <a href={`https://www.imdb.com/name/${actor?.imdb_id}`} rel="noreferrer" target="_blank"
                        className='text-xl text-yellow-600 font-righteous py-1 uppercase' >
                        <iconify-icon icon="fa:imdb" width="33" height="33" /> </a>
                    <p className='text-xl text-gray-400 py-2 font-kanit font-light'>{actor?.biography || "No Biography Found"}</p>
                </div>
                <div className="actorImage sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px] p-3">
                    <LazyImage url={actor?.profile_path ? w500 + actor?.profile_path : defImage}
                        className="w-auto rounded-3xl" />
                </div>
            </div>
        </div>
    )
}

export default ActorBio