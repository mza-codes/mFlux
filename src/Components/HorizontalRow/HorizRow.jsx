import { w500, w780 } from '../../Constants/Constants';
import { lazy, Suspense, useRef } from 'react';
import LazyImage from '../LazyImage';
import './HorizRow.scss';
import { useNavigate } from 'react-router-dom';
import useSearchResults from '../../Services/ResultFetch';
import { image404 } from '../../Assets';
import useWatchlist, { useFavouritesStore } from '../../Services/Store';

const PaginatedItems = lazy(() => import('../ReactPagination'));

const HorizRow = ({ data, title, close, ...props }) => {
    
    const closeResult = useSearchResults(s => s.toggleClose);
    const resultData = useSearchResults(s => s.response);
    const addPerson = useFavouritesStore(s => s.addPerson);
    const addToWatchList = useWatchlist(s => s.addToWatchList);
    const elRef = useRef();
    const route = useNavigate();

    const handleScroll = (param) => {
        switch (param) {
            case "next":
                elRef.current.scrollTo({
                    left: elRef.current.scrollLeft + 200
                });
                break;
            case "prev":
                elRef.current.scrollTo({
                    left: elRef.current.scrollLeft - 200
                });
                break;
            default:
                break;
        };
    };

    const handleStore = (data) => {
        // case for recents storage
        route(`/recents/${data?.id}`, { state: data?.media_type ?? "tv" });
        return;
    };

    const fetchPerson = (person) => {
        route(`/actor-details/${person?.id}`, { state: person?.media_type });
        return true;
    };

    return (
        <div>
            {data.length > 0 ? <>
                <div className='w-full flex flex-row justify-between items-center'>
                    <h3 className={`px-4 text-white text-2xl font-righteous pointer-events-none max-w-[80%]
                    ${close ? "text-emerald-400" : "capitalize"}`}>
                        {title || "Loading.."}
                    </h3>
                    {close && <div className=''>
                        <button onClick={e => route('/search-results')} className='text-white hover:text-yellow-400' >
                            <iconify-icon icon="material-symbols:grid-view-rounded" width="33" height="33" /> </button>
                        <button className='text-2xl mr-1 text-red-600 hover:text-orange-500' onClick={e => closeResult()}>
                            <iconify-icon icon="eva:close-square-fill" height="34" width={"34"} />
                        </button> </div>}
                </div>
                <div className="horizRow" ref={elRef} >
                    <div className="scrollButtons">
                        <button onClick={() => handleScroll("next")} onMouseEnter={e => handleScroll("next")}>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button onClick={() => handleScroll("prev")} onMouseEnter={e => handleScroll("prev")}>
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                    </div>

                    {data?.map((item, i) => {
                        if (item?.gender) {
                            return <div key={i} className="poster cursor-pointer relative">
                                <LazyImage
                                    url={item?.profile_path ? (w780 + item?.profile_path) : image404}
                                    onClick={e => fetchPerson(item)}
                                />
                                <div title='Add To Favourites'
                                    className="icon text-rose-600 hover:text-rose-500 z-[104] opacity-0 hover:opacity-95
                                        cursor-pointer absolute right-2 top-2"
                                    onClick={() => { addPerson(item) }}>
                                    <iconify-icon icon="mdi:favourite" width={18} height={18} />
                                </div>
                            </div>
                        } else {
                            return <div key={i} className="poster cursor-pointer relative">
                                <LazyImage onClick={e => handleStore(item)}
                                    url={item?.poster_path ? (w500 + item?.poster_path) :
                                        item?.backdrop_path ? (w500 + item?.backdrop_path) : image404}
                                />
                                <div title='Add To Favourites'
                                    className="icon text-rose-600 hover:text-rose-500 z-[104] opacity-0 hover:opacity-95
                                        cursor-pointer absolute right-2 top-2"
                                    onClick={() => { addToWatchList(item) }}>
                                    <iconify-icon icon="mdi:movie-open-star" width={18} height={18} />
                                </div>
                            </div>
                        };
                    })}
                </div>
                {close && resultData?.total_pages > 1 &&
                    <div className='w-full flex flex-row justify-center items-center'>
                        <div>
                            <Suspense fallback={<h1 className='text-2xl text-yellow-400 font-righteous'>Loading Page Controls...</h1>}>
                                <PaginatedItems data={resultData} />
                            </Suspense>
                        </div>
                    </div>}
            </> :
                <>
                    <div className='loadText'></div>
                    <div className='rowSkeleton'>
                        <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
                    </div>
                </>
            }
        </div>
    );
};

export default HorizRow;