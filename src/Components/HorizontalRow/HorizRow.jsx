import { w300 } from '../../Constants/Constants';
import LazyImage from '../LazyImage';
import './HorizRow.scss';

const HorizRow = ({ data, title, ...props }) => {
    
    return (
        <div className='p-3'>
            <h3 className='text-white text-4xl p-3 font-kanit pointer-events-none title'>{title || "Trending"}</h3>
            <div className="horizRow">
                {data.map((item, i) => (
                    <div key={i} className="poster">
                        <LazyImage url={w300 + (item?.poster_path || item?.backdrop_path)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HorizRow