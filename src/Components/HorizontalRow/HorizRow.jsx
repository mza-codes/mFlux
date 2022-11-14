import { w500 } from '../../Constants/Constants';
import LazyImage from '../LazyImage';
import './HorizRow.scss';

const HorizRow = ({ data, title, ...props }) => {
    // data = [];
    return (
        <div>
            {data.length ? <>
                <h3 className='px-4 text-white text-2xl font-righteous pointer-events-none capitalize'>
                    {title || "Loading.."}
                </h3>
                <div className="horizRow">
                    {data.map((item, i) => (
                        <div key={i} className="poster">
                            <LazyImage url={w500 + (item?.poster_path || item?.backdrop_path)} />
                        </div>
                    ))}
                </div>
            </> : <>
                <div className='loadText'></div>
                <div className='rowSkeleton'>
                    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
                </div>
            </> }
        </div>
    )
}

export default HorizRow