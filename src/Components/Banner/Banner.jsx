import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTER_URL } from '../../Constants/Constants';
import useRecents from '../../Contexts/useRecents';
import useSearchResults from '../../Services/ResultFetch';
import './Banner.scss';
import LazyLoad from 'react-lazy-load';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWatchlist from '../../Services/Store';
import { default as items } from '../../Assets/v2';

const HorizRow = lazy(() => import('../HorizontalRow/HorizRow'));

const Banner = () => {
    const addOne = useRecents(s => s.addOne);
    const route = useNavigate();
    let v = Math.floor(Math.random() * items?.length);

    const addToWatchList = useWatchlist(s => s.addToWatchList);
    const isClosed = useSearchResults(s => s.isClosed);
    const results = useSearchResults((state) => state.result);
    const query = useSearchResults((state) => state.query);
    const err = useSearchResults((state) => state.error);
    const gotResult = useSearchResults((state) => state.gotResult);

    const handlePlay = (data) => {
        addOne(data);
        route(`/recents/${data?.id}`, { state: data?.media_type ?? "movie" });
        return;
    };

    const viewItem = (movie) => {
        route(`/explore/${movie?.id}/${movie?.media_type ?? "tv"}`, {
            state: movie?.media_type ?? "tv"
        }); return;
    };

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className='control-btn hover:text-[#202020]' onClick={onClick}>
                <button className='next'>
                    <iconify-icon icon="material-symbols:chevron-right-rounded" width="50" height="50" />
                </button>
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className='control-btn hover:text-[#fff]' onClick={onClick} >
                <button className='prev'>
                    <iconify-icon icon="material-symbols:chevron-left-rounded" width="50" height="50" />
                </button>
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: v,
        lazyLoad: 'true'
    };

    return (
        <>
            <Slider {...settings}>
                {items.map((item, i) => (
                    <main className='Banner' key={item?.id ?? i}>
                        <LazyLoad offset={100}>
                            <div className="bg xl:h-[100vh] lg:h-[80vh] md:h-[70vh] sm:h-[66vh] h-[68vh]"
                                style={{
                                    backgroundImage: `url(${POSTER_URL +
                                        (item?.backdrop_path ? item?.backdrop_path : "/sobIeWp1a3saZTBkoRTAf8sfC7J.jpg")})`
                                }} >
                                <div className="content capitalize sm:w-full lg:w-1/2 w-full">
                                    <h2 className='font-righteous font-black styledTitle p-3'>
                                        {item?.title || item?.original_title || item?.name}
                                    </h2>
                                    <h5 className='font-light font-abel text-xl p-3'>{item?.overview || ""}</h5>
                                    <div className="buttons p-3 font-righteous">
                                        <button onClick={() => handlePlay(item)}>Play</button>
                                        <button onClick={() => viewItem(item)} >View</button>
                                    </div>
                                </div>
                                <div className="changeBtn">
                                    <div title="Favourite This" className='icon text-rose-500 hover:text-rose-600
                                        opacity-60 cursor-pointer hover:opacity-100'
                                        onClick={() => { addToWatchList(item) }} >
                                        <iconify-icon icon="mdi:favourite" width={"auto"} height={"auto"} />
                                    </div>
                                </div>
                            </div>
                        </LazyLoad>
                        <div className="fade"></div>
                    </main>
                ))}
            </Slider>

            {results?.length >= 1 && !isClosed && <>
                <Suspense fallback={<> <h2 className='text-center font-righteous text-6xl text-yellow-100 p-4 m-4'>Loading...</h2> </>}>
                    <HorizRow title={`Displaying ${results?.length} titles for "${query}" `} data={results} close />
                </Suspense>
            </>}
            {!gotResult && !isClosed && err &&
                <div className='w-full'> <h2 className='font-righteous text-2xl p-4 text-red-400'>{err}</h2> </div>}
        </>
    );
};

export default Banner;