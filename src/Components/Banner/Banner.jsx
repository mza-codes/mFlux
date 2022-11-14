import { useEffect, useState } from 'react';
import { POSTER_URL } from '../../Constants/Constants';
import './Banner.scss';

const Banner = () => {
    const [banner, setBanner] = useState({});
    const movie = localStorage.getItem("action2");

    const changeBg = () => {
        if (movie) {
            let data = JSON.parse(movie);
            let v = Math.floor(Math.random() * data.length);
            console.log(data[v]);
            setBanner(data[v]);
        };
        return;
    };

    useEffect(() => {
        changeBg();
    }, []);

    return (
        <div className='Banner'>
            <div className="bg"
                style={{ backgroundImage: `url(${POSTER_URL + banner?.backdrop_path || "/ekZobS8isE6mA53RAiGDG93hBxL.jpg"})` }}>
                <div className="content capitalize">
                    <h2 className='font-righteous text-4xl p-3'>{banner?.title || banner?.original_title}</h2>
                    <h5 className='font-light font-abel text-xl p-3'>{banner?.overview || ""}</h5>
                    <div className="buttons p-3 font-righteous">
                        <button>Play</button>
                        <button>View</button>
                    </div>
                </div>
                <div className="changeBtn">
                    <button className='font-kanit' onClick={changeBg}>Refresh</button>
                </div>
            </div>
            <div className="fade"></div>
        </div>
    )
}

export default Banner