import LazyLoad from 'react-lazy-load';

const LazyImage = ({ h, w, url, ...other }) => {
    return (
        <>
            <LazyLoad offset={200}>
                <img src={url} alt="_loading.." {...other} className="text-white" />
            </LazyLoad>
        </>
    )
}

export default LazyImage;