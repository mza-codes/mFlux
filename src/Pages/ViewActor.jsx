import Navbar from '../Components/Navbar/Navbar';
import useTmdbApi from '../Services/tmdb_Api';
import ActorBio from '../Components/ActorBio';
import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import SuggestionsPagination from '../Components/SuggestionsPagination';
import useRecents from '../Contexts/useRecents';
import { useEffect } from 'react';
import Loading from './Loading';
import { useState } from 'react';

const ViewActor = () => {
    const { actor, actorMovies, actorResult, getMoviesByActorId, getActor } = useTmdbApi();
    const [loading, setLoading] = useState(true);
    const { addOne } = useRecents();
    const { id } = useParams();
    const route = useNavigate();
    const getFunc = (data) => {
        console.log("getfunc called", data);
        addOne(data);
        route(`/recents/${data?.id}`, { state: true });
        return;
    };

    const fetchActor = async () => {
        await getActor({ id });
        setLoading(false);
        return;
    };

    useEffect(() => {
        fetchActor();
    }, [id]);

    if (!actor?.id || loading) { return <Loading err={`404 Not Found`} msg={`Actor with id "${id}" not found on TMDB Database !`} /> }

    return (
        <>
            <Navbar />
            <div className='mainPage pt-20  text-white'>
                <button onClick={e => route(-1)} className='bg-white bg-opacity-30 text-black
                 hover:bg-orange-500 p-2 font-kanit fixed z-50 bottom-2 right-1'>
                    Go Back
                </button>
                {actor?.id && <ActorBio actor={actor} />}
                {/* Actor Based Movies */}
                {actorMovies?.length > 0 && <div className="suggestionSection w-full text-center">
                    <h3 className='text-3xl py-3'>You Might Also Like</h3>
                    <div className="suggestionsWrapper flex flex-row flex-wrap w-full items-center justify-center ">
                        {actorMovies?.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie} handleStore={getFunc} />
                        ))}
                    </div>
                    {actorResult?.total_pages > 1 && <div className="w-full pagin flex items-center justify-center fixed bottom-1">
                        <div className='bg-zinc-600 rounded-lg'>
                            <SuggestionsPagination
                                currentPage={actorResult?.page}
                                totalPage={actorResult?.total_pages}
                                api={getMoviesByActorId}
                                query={actor?.id} />
                        </div>
                    </div>}
                </div>}
            </div>
        </>
    )
};

export default ViewActor;