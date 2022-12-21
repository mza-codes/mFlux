import { mFluxLogo } from "../../Assets";

const Footer = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center text-center text-white">
            <div className="ml-5 footerLogo">
                <img src={mFluxLogo} alt="_logo_mFlux" className='max-w-[150px] max-h-[150px]' />
            </div>
            <div className="texts py-3 flex flex-col items-center justify-center text-center space-y-1 font-poppins font-medium">
                <h4>Copyrights © {new Date().getFullYear()}</h4>
                <div className="footericons gap-2 flex flex-row py-2">
                    <a href="https://github.com/mza-codes/" target="_blank" rel='noreferrer'
                        className='text-gray-400 hover:text-fuchsia-400'>
                        <iconify-icon icon="radix-icons:github-logo" width={33} height={33} />
                    </a>
                    <a href="https://mza-codes.github.io/" target="_blank" rel='noreferrer'
                        className='text-orange-500 hover:text-sky-400'>
                        <iconify-icon icon="fluent-mdl2:website" width={33} height={33} />
                    </a>
                    <a href="https://instagram.com/mzee_muzammil/" target="_blank" rel='noreferrer'
                        className='text-rose-400 hover:text-red-600'>
                        <iconify-icon icon="simple-icons:instagram" width={33} height={33} />
                    </a>
                </div>
                <h4>mza-codes</h4>
            </div>
        </div>
    );
};

export default Footer;