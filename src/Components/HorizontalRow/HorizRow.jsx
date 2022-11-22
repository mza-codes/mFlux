import { w500 } from '../../Constants/Constants';
import { lazy, Suspense, useRef } from 'react';
import LazyImage from '../LazyImage';
import './HorizRow.scss';
import useRecents from '../../Contexts/useRecents';
import { useNavigate } from 'react-router-dom';
import useSearchResults from '../../Services/ResultFetch';
import defaultImg from '../../Assets/default.jpg';

const PaginatedItems = lazy(() => import('../ReactPagination'));

const HorizRow = ({ data, title, close, ...props }) => {
    // data = [];
    const { recents, addItem: setRecents } = useRecents();
    const { toggleClose: closeResult, response: resultData } = useSearchResults();
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
        const duplicate = recents.filter((item) => {
            return item.id !== data.id
        });
        duplicate.push(data);
        duplicate.reverse();
        setRecents(duplicate);
        route(`/recents/${data?.id}`, { state: true });
        return;
    };

    return (
        <div>
            {data.length ? <>
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
                    {data.map((item, i) => (
                        <div key={i} className="poster cursor-pointer" onClick={e => handleStore(item)} >
                            <LazyImage
                                url={item?.poster_path || item?.backdrop_path ?
                                    (w500 + item?.poster_path || item?.backdrop_path) : defaultImg} />
                        </div>
                    ))}
                </div>
                {close && resultData?.total_pages > 1 &&
                    <div className='w-full flex flex-row justify-center items-center'>
                        <div>
                            <Suspense fallback={<h1 className='text-2xl text-yellow-400 font-righteous'>Loading Page Controls...</h1>}>
                                <PaginatedItems data={resultData} />
                            </Suspense>
                        </div>
                    </div>}
            </> : <>
                <div className='loadText'></div>
                <div className='rowSkeleton'>
                    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
                </div>
            </>}
        </div>
    )
}

export default HorizRow;