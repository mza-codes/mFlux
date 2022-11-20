import logo from '../Components/Navbar/mFlux.png';
import './Loading.scss';

const Loading = () => {
    return (
        <div className='loadPage '>
            <div className='logoContainer '>
                <img src={logo} alt="_logo_mFlux" />
            </div>

            <div className="myLoader">
                {/* <div className="lds-facebook"><div /><div /><div /><div /><div /><div /> </div> */}
                {/* <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> */}

                <div className="lds-ripple"><div></div><div></div></div>
                {/* <div class="lds-hourglass"></div> */}
            </div>
            <h1 className='text-white text-2xl font-kanit w-full text-center'>Loading Content</h1>
            <p className='text-white font-righteous font-medium'>This website is best viewed in large screens & <br />
                best performed in Google Chrome Version 107.0.5304.107  !</p>
            <div className="lds-ellipsis">
                <div /> <div /> <div /> <div />
            </div>
            <p>CopyRights © {(new Date().getFullYear())} <br />
                <a href="https://mza-codes.github.io/" rel='noreferrer' target="_blank" className='mza-link'>mza-codes</a>
            </p>
        </div>
    )
}

export default Loading
