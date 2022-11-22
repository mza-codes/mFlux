import '../styles.scss';
const LoaderMini = () => (
    <div className="text-white flex flex-col items-center justify-center text-center pt-9">
        {/* <div className='flex items-center flex-col justify-center text-center'> */}
            <div className="lds-ripple"><div></div><div></div></div>
            <h2 className='font-righteous text-4xl py-3 '>Loading</h2>
        {/* </div> */}
    </div>
)


export default LoaderMini;