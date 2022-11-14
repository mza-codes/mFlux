import { w500 } from '../../Constants/Constants';
import { useState } from 'react';
import LazyImage from '../LazyImage';
import styled from 'styled-components';
import './HorizRow.scss';

const HorizRow = ({ data, title, ...props }) => {
    // data = [];
    const [scrollValue, setScrollValue] = useState(0);
    // const value = "0%"
    const ScrollRow = styled.div`
        transform: translateX(-${scrollValue}%);
    `
    return (
        <div>
            {data.length ? <>
                <h3 className='px-4 text-white text-2xl font-righteous pointer-events-none capitalize'>
                    {title || "Loading.."}
                </h3>
                <ScrollRow className="horizRow">
                    <div className="scrollButtons">
                        <button onClick={() => setScrollValue((curr) => (curr + 10))} >&gt;</button>
                        <button onClick={() => setScrollValue((curr) => (curr - 10))}>&lt;</button>
                    </div>
                    {data.map((item, i) => (
                        <div key={i} className="poster">
                            <LazyImage url={w500 + (item?.poster_path || item?.backdrop_path)} />
                        </div>
                    ))}
                </ScrollRow>
            </> : <>
                <div className='loadText'></div>
                <div className='rowSkeleton'>
                    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
                </div>
            </>}
        </div>
    )
}

export default HorizRow