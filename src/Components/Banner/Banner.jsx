import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTER_URL } from '../../Constants/Constants';
import { useRecents } from '../../Contexts/RecentsProvider';
import useSearchResults from '../../Services/ResultFetch';
import HorizRow from '../HorizontalRow/HorizRow';
import './Banner.scss';

const Banner = () => {
    const [banner, setBanner] = useState({});
    const { recents, setRecents } = useRecents();
    const route = useNavigate();
    const movie = localStorage.getItem("family");
    const results = useSearchResults((state) => state.result);
    const query = useSearchResults((state) => state.query);
    const err = useSearchResults(state => state.error);
    const values = useSearchResults((state) => state);
    console.log("logging Results from Banner", values);

    const changeBg = () => {
        if (movie) {
            let data = JSON.parse(movie);
            let v = Math.floor(Math.random() * data.length);
            console.log(data[v]);
            setBanner(data[v]);
        };
        return;
    };

    const handlePlay = () => {
        const filtered = recents.map((item) => {
            return item?.id !== banner?.id
        });
        filtered.push(banner);
        filtered.reverse();
        setRecents(filtered);
        route('/recents');
        return;
    };

    useEffect(() => {
        changeBg();
    }, []);

    return (
        <>
            <div className='Banner'>
                <div className="bg"
                    style={{ backgroundImage: `url(${POSTER_URL + banner?.backdrop_path || ""})` }}>
                    <div className="content sm:w-full lg:w-1/2 capitalize">
                        <h2 className='font-righteous text-4xl p-3 lg:w-1/2'>{banner?.title || banner?.original_title}</h2>
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
            {results?.length ? <HorizRow title={`Displaying ${results?.length} titles for "${query}" `} data={results} />
            : <div className='w-full'> <h2 className='font-righteous text-2xl p-4 text-red-400'>{err}</h2> </div> }
        </>)
}

export default Banner