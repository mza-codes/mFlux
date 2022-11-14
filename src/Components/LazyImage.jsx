import LazyLoad from 'react-lazy-load';

const LazyImage = ({ h, w, url, ...other }) => {

    return (
        <LazyLoad offset={200}>
            <img src={url} alt="_loading.." />
        </LazyLoad>
    )
}

export default LazyImage;