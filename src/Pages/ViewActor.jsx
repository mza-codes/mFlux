import Navbar from '../Components/Navbar/Navbar';
import useTmdbApi, { controller } from '../Services/tmdb_Api';
import ActorBio from '../Components/ActorBio';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../Components/MovieCard';
import SuggestionsPagination from '../Components/SuggestionsPagination';
import useRecents from '../Contexts/useRecents';
import { useEffect } from 'react';
import Loading from './Loading';
import { useState } from 'react';
import { hooker } from '../Utils/tmdb';

const ViewActor = () => {
    const actor = hooker("actor", useTmdbApi);
    const actorMovies = hooker("actorMovies", useTmdbApi);
    const actorResult = hooker("actorResult", useTmdbApi);
    const getMoviesByActorId = hooker("getMoviesByActorId", useTmdbApi);
    const getActor = hooker("getActor", useTmdbApi);

    const [loading, setLoading] = useState(true);
    const { addOne } = useRecents();
    const { id } = useParams();
    const route = useNavigate();

    const getFunc = (data) => {
        console.log("getfunc called", data);
        addOne(data);
        route(`/recents/${data?.id}`, { state: data?.media_type });
        return;
    };

    const fetchActor = async () => {
        await getActor({ id });
        setLoading(false);
        return;
    };

    useEffect(() => {
        fetchActor();
        return () => controller?.abort();
    }, [id]);

    useEffect(() => {
        getMoviesByActorId({ id: actor?.id });
        return () => {
            console.log("Useeffect Return func,Controller.abort() priniting Controller", controller);
            controller?.abort();
        };
    }, [actor]);

    if (!actor?.id || loading) { return <Loading err={`404 Not Found`} msg={`Actor with id "${id}" not found on TMDB Database !`} /> }

    return (
        <>
            <Navbar />
            <main className='mainPage pt-20  text-white'>
                <Link to={-1} className='bg-white bg-opacity-30 text-black hover:bg-orange-500 p-2 font-kanit 
                fixed z-50 bottom-2 right-1'>
                    Go Back
                </Link>

                {actor?.id &&
                    <div className="w-full">
                        <ActorBio actor={actor} />
                    </div>
                }

                {/* Actor Based Movies */}
                {actorMovies?.length > 0 &&
                    <div className="suggestionSection w-full text-center">
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
            </main>
        </>
    )
};

export default ViewActor;