import { POSTER_URL } from '../Constants/Constants';
import defImage from '../Assets/default.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { useFavouritesStore } from '../Services/Store';
import LazyLoad from 'react-lazy-load';

const loaderAtom = atom(false);

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
    const [loading, setLoading] = useAtom(loaderAtom);
    const navigate = useNavigate();
    const addPerson = useFavouritesStore(s => s.addPerson);

    const goBack = () => {
        navigate(-1, { replace: true });
        return;
    };

    useEffect(() => {
        if (actor?.id || actor?.name) {
            setLoading(false);
        };
    }, [actor]);

    if (!actor?.id || !actor?.name) { return <ErrMsg route={goBack} /> };
    if (loading) {
        return (
            <h1 className=' text-6xl py-8 font-righteous text-center text-teal-400'>Loading..</h1>
        );
    };
    return (
        <section className=" text-white py-6 actorWrapper flex flex-row flex-wrap justify-evenly ">
            <div className="actorImage sm:w-full md:w-1/2 lg:w-1/2 max-w-md min-w-[280px] p-3 max-h-fit relative">
                <div className="flex items-center justify-center">

                    <div className='relative'>
                        <LazyLoad offset={300}>
                            <img className="w-auto rounded-3xl"
                                src={actor?.profile_path ? POSTER_URL + actor?.profile_path : defImage}
                                alt="_actor_image" />
                        </LazyLoad>

                        <div className="icon text-rose-500 hover:text-rose-600 z-[104] opacity-0 hover:opacity-100
                        cursor-pointer absolute right-2 top-2" onClick={() => addPerson(actor)} >
                            <iconify-icon icon="mdi:favourite" width={36} height={36} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile min-w-[280px] xl:max-w-[46vw] text-center ml-2 lg:max-w-[46vw] px-3
                xl:text-start lg:text-start sm:text-center sm:mx-w-[80vw]">
                <h1 className='text-4xl text-zinc-200 font-righteous py-1' >{actor?.name}</h1>
                <h2 className='text-3xl text-zinc-300 font-righteous py-1' >{actor?.place_of_birth}</h2>
                <p className='text-2xl text-slate-300 font-righteous py-1' >{actor?.birthday && "Birthday: " + actor?.birthday}</p>
                {actor?.known_for_department &&
                    <h3 className='text-xl text-gray-300 font-righteous py-1' >
                        Profession: {actor?.known_for_department}
                    </h3>
                }
                <div className='links flex flex-row gap-3 justify-center xl:justify-start lg:justify-start sm:justify-center'>
                    <a href={`https://www.imdb.com/name/${actor?.imdb_id}`} rel="noreferrer" target="_blank"
                        className='text-xl text-yellow-600 font-righteous py-1 uppercase' >
                        <iconify-icon icon="fa:imdb" width="33" height="33" /> </a>
                    {actor?.homepage && <a href={`${actor?.homepage}`} rel="noreferrer" target="_blank"
                        className='text-xl text-blue-500 font-righteous py-1 uppercase' >
                        <iconify-icon icon="dashicons:admin-site" width="33" height="33" /> </a>}
                </div>
                <p className='text-xl text-gray-400 p-2 font-kanit font-light '>
                    {actor?.biography?.length > 800 ? actor?.biography?.slice(0, 904) + "..."
                        : actor?.biography || "No Biography Found"}
                </p>
            </div>
        </section>
    );
};

export default ActorBio