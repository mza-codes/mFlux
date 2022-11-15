import { w500 } from '../../Constants/Constants';
import { useRef, useState } from 'react';
import LazyImage from '../LazyImage';
import './HorizRow.scss';
import { useRecents } from '../../Contexts/RecentsProvider';
import { useNavigate } from 'react-router-dom';

const HorizRow = ({ data, title, ...props }) => {
    // data = [];
    const { recents, setRecents } = useRecents();
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
        console.log(duplicate);
        setRecents(duplicate);
        route('/recents');
        return;
    };

    // const scrollHoriz = () => {
    //     const el = elRef.current;
    //     if (el) {
    //         const onWheel = e => {
    //             if (e.deltaY == 0) return;
    //             e.preventDefault();
    //             el.scrollTo({
    //                 left: el.scrollLeft + e.deltaY,
    //                 behavior: "smooth"
    //             });
    //         };
    //         el.addEventListener("wheel", onWheel);
    //         return () => el.removeEventListener("wheel", onWheel);
    //     };
    // };

    return (
        <div>
            {data.length ? <>
                <h3 className='px-4 text-white text-2xl font-righteous pointer-events-none capitalize'>
                    {title || "Loading.."}
                </h3>
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
                        <div key={i} className="poster cursor-pointer" onClick={e => handleStore(item)}
                        // style={{ translate: `-${scrollValue}%` }}
                        >
                            <LazyImage url={w500 + (item?.poster_path || item?.backdrop_path)} />
                        </div>
                    ))}
                </div>
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