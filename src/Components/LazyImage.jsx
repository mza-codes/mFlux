import LazyLoad from 'react-lazy-load';

const LazyImage = ({ h, w, url, ...other }) => {
    return (
        <LazyLoad offset={300}>
            <img src={url} alt="_loading.." {...other} />
        </LazyLoad>
    );
};

export default LazyImage;