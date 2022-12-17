import { Link } from 'react-router-dom';
import '../styles.scss';

const ErrorPage = () => (
    <section className="text-[#ff9b28] flex flex-col items-center justify-center text-center pb-16 min-h-screen">

        <iconify-icon icon="ic:baseline-nearby-error" width={184} height={184} />
        <h2 className='font-kanit font-normal text-[#ff2929] text-6xl py-3 '>404 Not Found</h2>
        <h2 className='text-white text-2xl py-3 '>The page you are looking for does not seems to exist!
            <br /> However feel free to reach us if this is an error.</h2>
        <br />
        <a className='text-green-400 hover:text-green-300'
            href="https://github.com/mza-codes/mFlux/issues/" target="_blank" rel="noreferrer" >Report Issue (Github)</a>
        
        <Link to="/" replace className='p-2 bg-zinc-300 hover:bg-white my-2
        cursor-pointer rounded-lg text-black font-semibold' 
        >Home</Link>

    </section>
)


export default ErrorPage;