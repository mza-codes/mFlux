import { w500 } from '../../Constants/Constants';
import LazyImage from '../LazyImage';
import './HorizRow.scss';

const HorizRow = ({ data, title, ...props }) => {
    // data = [];
    return (
        <div className='p-3'>
            {data.length ? <>
                <h3 className='text-white text-2xl p-3 font-righteous pointer-events-none title'>
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