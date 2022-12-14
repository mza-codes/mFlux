import { Link } from 'react-router-dom';
import '../styles.scss';

const ErrorPage = () => (
    <section className="text-amber-300 flex flex-col items-center justify-center text-center pb-16 min-h-screen">

        <iconify-icon icon="ic:twotone-wifi-tethering-error" width={154} height={154} />
        <h2 className='font-poorStory font-normal text-[#ff0000c9] text-6xl py-3 '>404 Not Found</h2>
        <h2 className='text-red-200 text-2xl py-3 '>The page you are looking for does not seems to exist!
            <br /> However feel free to reach us if this is an error.</h2>
        <br />
        <a className='text-green-400 hover:text-green-300'
            href="https://github.com/mza-codes/mFlux/issues/" target="_blank" rel="noreferrer" >Report Issue (Github)</a>
        
        <Link to="/" replace className='p-2 bg-orange-400 hover:bg-orange-500 my-1
        cursor-pointer rounded-lg text-black font-semibold' 
        >Home</Link>

    </section>
)


export default ErrorPage;