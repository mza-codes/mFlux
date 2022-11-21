import '../styles.scss';
const ErrorPage = () => (
    <div className="text-white flex flex-col items-center justify-center text-center pt-9">
        {/* <div className='flex items-center flex-col justify-center text-center'> */}
            <div className="lds-ripple"><div></div><div></div></div>
            <h2 className='font-righteous text-[#ffcc] text-3xl py-3 '>404 Not Found</h2>
            <h2 className='font-poppins text-rose-400 text-2xl py-3 '>The page you are looking for does not seems to exist! 
            <br /> However feel free to reach us to report errors.</h2>
        {/* </div> */}
    </div>
)


export default ErrorPage;