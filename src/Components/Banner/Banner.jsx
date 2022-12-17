import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTER_URL } from '../../Constants/Constants';
import useRecents from '../../Contexts/useRecents';
import useSearchResults from '../../Services/ResultFetch';
import './Banner.scss';
import { mfluxCache } from '../../Services/Row';

const HorizRow = lazy(() => import('../HorizontalRow/HorizRow'));

const Banner = () => {
    const [banner, setBanner] = useState({});
    const { addOne } = useRecents();
    const route = useNavigate();
    const movie = localStorage.getItem(mfluxCache);
    const values = useSearchResults((state) => state);
    const { result: results, query, error: err, gotResult } = values;

    const changeBg = () => {
        if (movie) {
            let value = JSON.parse(movie);
            const data = value?.state?.data;
            const items = data["trending"];
            let v = Math.floor(Math.random() * items.length);
            console.log(items[v]);
            setBanner(items[v]);
            return true;
        };
        return false;
    };

    const handlePlay = () => {
        addOne(banner);
        route(`/recents/${banner?.id}`, { state: banner?.media_type ?? "movie" });
        return;
    };

    useEffect(() => {
        changeBg();
    }, []);

    return (
        <>
            <div className='Banner'>
                <div className="bg xl:h-[100vh] lg:h-[80vh] md:h-[70vh] sm:h-[66vh] h-[68vh]"
                    style={{
                        backgroundImage: `url(${POSTER_URL + (banner?.backdrop_path ? banner?.backdrop_path
                            : "/sobIeWp1a3saZTBkoRTAf8sfC7J.jpg")})`
                    }}>
                    <div className="content sm:w-full lg:w-1/2 capitalize">
                        <h2 className='font-righteous text-4xl p-3 lg:w-1/2'>{banner?.title || banner?.original_title || banner?.name}</h2>
                        <h5 className='font-light font-abel text-xl p-3'>{banner?.overview || ""}</h5>
                        <div className="buttons p-3 font-righteous">
                            <button onClick={handlePlay}>Play</button>
                            <button>View</button>
                        </div>
                    </div>
                    <div className="changeBtn">
                        <button className='font-kanit' onClick={changeBg}><i className="text-2xl ri-restart-fill"></i></button>
                    </div>
                </div>
                <div className="fade"></div>
            </div>
            {results?.length >= 1 && !values.isClosed && <>
                <Suspense fallback={<> <h2 className='text-center font-righteous text-6xl text-yellow-100 p-4 m-4'>Loading...</h2> </>}>
                    <HorizRow title={`Displaying ${results?.length} titles for "${query}" `} data={results} close />
                </Suspense></>}
            {!gotResult && !values.isClosed && err &&
                <div className='w-full'> <h2 className='font-righteous text-2xl p-4 text-red-400'>{err}</h2> </div>}
        </>
    );
};

export default Banner;