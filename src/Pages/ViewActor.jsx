import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import { atom, useAtom } from 'jotai';
import useTmdbApi from '../Services/tmdb_Api';
import ActorBio from '../Components/ActorBio';
import { useNavigate } from 'react-router-dom';

const loaderAtom = atom(false);
const ViewActor = () => {
    const { actor } = useTmdbApi();
    const [loading, setLoading] = useAtom(loaderAtom);
    const route = useNavigate();
    if (loading) return <h1 className='font-righteous text-6xl text-green-400 p-5 text-center'>Loading...</h1>

    return (
        <>
            <Navbar />
            <div className='mainPage pt-20 relative'>
                    <button onClick={e => route('/recents')}
                        className='bg-white bg-opacity-30 text-black hover:bg-orange-500 p-2 font-kanit absolute bottom-2 right-1'>Go Back</button>
                <ActorBio />
                
            </div>
        </>
    )
};

export default ViewActor;