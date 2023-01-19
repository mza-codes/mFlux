import './Loading.scss';

const Loader = ({ page }) => (
    <>
        <div className={page ? "loaderParentPage" : "loaderParent"}>
            <h2 className='movieLog font-black font-righteous text-7xl lg:text-9xl'>mFlux</h2>
            <div className="loaderContainer">
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
            </div>
            <h4 className='gradient-text text-2xl'>Loading Content</h4>
            <span className='gradient-text text-xl pt-6'> © <br /> {new Date().getFullYear()} <br /> mza-codes</span>
        </div>
    </>
);

export default Loader;