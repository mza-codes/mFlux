import { w500 } from '../../Constants/Constants';
import { useState } from 'react';
import LazyImage from '../LazyImage';
import './HorizRow.scss';
import { useRecents } from '../../Contexts/RecentsProvider';
import { useNavigate } from 'react-router-dom';

const HorizRow = ({ data, title, ...props }) => {
    // data = [];
    const [scrollValue, setScrollValue] = useState(0);
    const { recents, setRecents } = useRecents();
    const route = useNavigate();

    const handleScroll = (param) => {
        switch (param) {
            case "next":
                console.log("NEXT");
                if (scrollValue > 1500) {
                    setScrollValue(2300);
                    console.log("limit reached", scrollValue);
                    return;
                };
                setScrollValue((curr) => (curr + 500));
                break;
            case "prev":
                console.log("PREVI");
                if (scrollValue < 0) {
                    setScrollValue(0);
                    console.log("scroll value negative", scrollValue);
                    return;
                };
                setScrollValue((curr) => (curr - 500));
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

    return (
        <div>
            {data.length ? <>
                <h3 className='px-4 text-white text-2xl font-righteous pointer-events-none capitalize'>
                    {title || "Loading.."}
                </h3>
                <div className="horizRow">
                    <div className="scrollButtons">
                        <button onClick={() => handleScroll("next")} onMouseEnter={e => handleScroll("next")} >
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button onClick={() => handleScroll("prev")} onMouseEnter={e => handleScroll("prev")} >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                    </div>
                    {data.map((item, i) => (
                        <div key={i} className="poster cursor-pointer" onClick={e => handleStore(item)}
                            style={{ translate: `-${scrollValue}px` }}>
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